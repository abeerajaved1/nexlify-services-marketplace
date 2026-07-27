// backend/automation/businessDiscovery.js
//
// Free, no-key, no-card location-based business discovery using OpenStreetMap:
//   1. Nominatim (OSM's free geocoder) turns "Lahore, Pakistan" into lat/lon
//   2. Overpass API (OSM's free query engine) finds businesses near that point
//      matching a keyword, that have a website tag on OpenStreetMap
//
// This is the genuinely-free alternative to Google Places API, which has a
// free quota but REQUIRES a billing card on file even to get it. OSM never
// asks for a card, ever — it's public open data.
//
// Coverage caveat: OSM is community-maintained. Big cities (Lahore, Karachi,
// Islamabad etc.) are generally well mapped, but it won't be as complete as
// Google Maps. You'll get real, usable results — just not exhaustive ones.

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

// The main overpass-api.de instance gets overloaded and returns 504s often —
// especially for "cold" queries. Fall back through public mirrors before
// giving up, instead of failing on the first one.
const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://lz4.overpass-api.de/api/interpreter',
];

// Nominatim's usage policy requires a descriptive User-Agent identifying the app.
const USER_AGENT = 'NexlifyLeadFinder/1.0 (internal business tool)';

async function geocodeLocation(location) {
  const url = `${NOMINATIM_URL}?q=${encodeURIComponent(location)}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`Geocoding failed (status ${res.status})`);

  const results = await res.json();
  if (!results.length) throw new Error(`Could not find location: "${location}"`);

  return { lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon) };
}

// Finds OSM nodes/ways with a website tag within `radiusMeters` of the given
// point, then filters by `keyword` in JS afterward (see rationale below).
async function searchBusinesses({ lat, lon, keyword, radiusMeters = 5000, limit = 15 }) {
  // IMPORTANT: we deliberately do NOT filter by name inside the Overpass
  // query. A case-insensitive regex match on "name" (the ["name"~"...",i]
  // filter) is one of the most expensive operations Overpass supports —
  // it forces a full scan instead of using the tag index, and the free
  // public instances reliably 504 on it for anything but tiny radii.
  // Instead we ask Overpass only for "has a website, is in this radius"
  // (fast, indexed), pull back a larger raw batch, and do the keyword
  // matching ourselves in plain JS below.
  const rawBatchSize = Math.min(Math.max(limit * 10, 100), 300);

  const query = `
[out:json][timeout:25];
(
  node["website"](around:${radiusMeters},${lat},${lon});
  way["website"](around:${radiusMeters},${lat},${lon});
);
out center ${rawBatchSize};
`.trim();

  let data;
  let lastError;

  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const res = await fetch(mirror, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': USER_AGENT,
        },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(25000),
      });

      // 504/502/503 mean the mirror itself is overloaded — try the next one.
      // Any other non-ok status (e.g. 400 bad query) won't be fixed by
      // switching mirrors, so throw immediately instead of retrying.
      if (!res.ok) {
        if ([502, 503, 504].includes(res.status)) {
          lastError = new Error(`Overpass mirror ${mirror} busy (status ${res.status})`);
          continue;
        }
        throw new Error(`Business search failed (status ${res.status})`);
      }

      data = await res.json();
      break; // success — stop trying mirrors
    } catch (err) {
      // Network errors / timeouts also just mean "try the next mirror"
      lastError = err;
    }
  }

  if (!data) {
    throw new Error(
      `${lastError?.message || 'Business search failed'} — all Overpass mirrors were busy. Try again in a minute, or use a smaller radius.`
    );
  }

  const keywordLower = keyword.toLowerCase();

  return (data.elements || [])
    .map((el) => {
      const tags = el.tags || {};
      let website = tags.website || tags['contact:website'] || '';
      if (website && !/^https?:\/\//i.test(website)) website = `https://${website}`;
      return {
        name: tags.name || '',
        website,
        phone: tags.phone || tags['contact:phone'] || '',
        address: [tags['addr:street'], tags['addr:city']].filter(Boolean).join(', '),
      };
    })
    .filter((b) => b.website && b.name.toLowerCase().includes(keywordLower))
    .slice(0, limit);
}

async function discoverBusinesses({ location, keyword, radiusMeters = 5000, limit = 15 }) {
  const { lat, lon } = await geocodeLocation(location);
  const businesses = await searchBusinesses({ lat, lon, keyword, radiusMeters, limit });
  return businesses;
}

module.exports = { discoverBusinesses };