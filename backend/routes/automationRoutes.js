// backend/routes/automationRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const ctrl = require('../controllers/automationController');

const router = express.Router();

// Every route here is admin-only — this is your internal sales tool, not public.
router.use(authMiddleware);

router.post('/leads', ctrl.addLeadsFromUrls);
router.post('/leads/discover', ctrl.discoverLeads);
router.get('/leads', ctrl.listLeads);
router.get('/leads/:id', ctrl.getLead);
router.patch('/leads/:id', ctrl.updateLead);

router.post('/leads/:id/proposal', ctrl.createProposal);

router.post('/leads/:id/email/draft', ctrl.draftLeadEmail);
router.patch('/email/:id', ctrl.editDraftEmail);
router.post('/email/:id/send', ctrl.approveAndSend);
router.get('/emails', ctrl.listEmails);

module.exports = router;