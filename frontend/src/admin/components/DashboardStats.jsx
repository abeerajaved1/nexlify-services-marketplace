import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import '../../styles/DashboardStats.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DashboardStats({ stats }) {
  const colors = {
    primary: '#60a5fa',
    primaryDark: '#3b82f6',
    accent: '#a78bfa',
    pink: '#f472b6',
    teal: '#2dd4bf',
    rose: '#fb7185',
    cyan: '#22d3ee',
    emerald: '#34d399',
    orange: '#fb923c',
  };

  const chartColors = [
    colors.primary,
    colors.accent,
    colors.pink,
    colors.teal,
    colors.rose,
    colors.cyan,
  ];

  // DUMMY DATA GENERATORS - Used when real data is empty
  const getDummyPieData = () => [35, 25, 22, 18];
  const getDummyBarData = () => [12, 8, 15, 10];
  const getDummyLineData = () => {
    const dates = [];
    const counts = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      dates.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      counts.push(Math.floor(Math.random() * 8) + 2 + (7 - i) * 1.5);
    }
    return { dates, counts };
  };

  // Determine if we have real data
  const hasPieData = stats.requestsPerService?.some((v) => v > 0);
  const hasBarData = stats.projectsPerCategory?.some((v) => v > 0);
  const hasLineData = stats.requestsOverTime?.length > 0;

  // Get actual or dummy data
  const pieValues = hasPieData ? stats.requestsPerService : getDummyPieData();
  const barValues = hasBarData ? stats.projectsPerCategory : getDummyBarData();
  
  // FIXED: Renamed to processedLineData to avoid conflict
  const processedLineData = hasLineData 
    ? { 
        labels: stats.requestsOverTime.map(d => d.date), 
        counts: stats.requestsOverTime.map(d => d.count) 
      }
    : getDummyLineData();

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 12, weight: '500' },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f8fafc',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(96, 165, 250, 0.2)',
        borderWidth: 1,
        padding: 14,
        cornerRadius: 10,
        displayColors: true,
        boxPadding: 6,
        titleFont: { family: 'Inter', size: 13, weight: '600' },
        bodyFont: { family: 'Inter', size: 12 },
        callbacks: {
          label: function(context) {
            return ' ' + context.parsed.y !== undefined ? context.parsed.y : context.parsed + ' entries';
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: { family: 'Inter', size: 11 },
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
          font: { family: 'Inter', size: 11 },
        },
      },
    },
  };

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.totalRequests || 128,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-400',
      glow: 'shadow-blue-500/25',
      trend: '+12.5%',
      trendUp: true,
      barWidth: '75%',
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects || 48,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/>
          <path d="M17 21v-8"/>
          <path d="M7 21v-8"/>
          <path d="M7 3v5h10V3"/>
          <rect width="18" height="18" x="3" y="3" rx="2"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-purple-500/25',
      trend: '+5.2%',
      trendUp: true,
      barWidth: '60%',
    },
    {
      title: 'Total Services',
      value: stats.totalServices || 15,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      gradient: 'from-pink-500 to-rose-500',
      glow: 'shadow-pink-500/25',
      trend: '0%',
      trendUp: null,
      barWidth: '100%',
    },
  ];

  // PIE CHART - Requests Per Service
  const pieData = {
    labels: ['AI Solutions', 'Web Dev', 'Content Writing', 'Automation'],
    datasets: [
      {
        data: pieValues,
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',   // Purple
          'rgba(59, 130, 246, 0.8)',   // Blue
          'rgba(45, 212, 191, 0.8)',   // Teal
          'rgba(244, 114, 182, 0.8)',  // Pink
        ],
        borderWidth: 0,
        hoverOffset: 12,
        hoverBorderWidth: 2,
        hoverBorderColor: 'rgba(255,255,255,0.1)',
      },
    ],
  };

  const pieOptions = {
    ...commonOptions,
    cutout: '65%',
    plugins: {
      ...commonOptions.plugins,
      legend: {
        position: 'right',
        labels: {
          ...commonOptions.plugins.legend.labels,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return ` ${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    },
  };

  // BAR CHART - Projects Per Category
  const barData = {
    labels: ['AI', 'Automation', 'Web', 'Content'],
    datasets: [
      {
        label: 'Projects',
        data: barValues,
        backgroundColor: [
          'rgba(139, 92, 246, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(45, 212, 191, 0.7)',
          'rgba(244, 114, 182, 0.7)',
        ],
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 40,
        hoverBackgroundColor: [
          'rgba(139, 92, 246, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(45, 212, 191, 0.9)',
          'rgba(244, 114, 182, 0.9)',
        ],
      },
    ],
  };

  // LINE CHART - Requests Over Time
  // FIXED: Renamed from lineData to lineChartData
  const lineChartData = {
    labels: processedLineData.labels,
    datasets: [
      {
        label: 'Requests',
        data: processedLineData.counts,
        borderColor: colors.primary,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 320);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)');
          gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.15)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          return gradient;
        },
        tension: 0.45,
        fill: true,
        pointBackgroundColor: '#020617',
        pointBorderColor: colors.primary,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: colors.primary,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const lineOptions = {
    ...commonOptions,
    scales: {
      ...commonOptions.scales,
      y: {
        ...commonOptions.scales.y,
        beginAtZero: true,
        ticks: { ...commonOptions.scales.y.ticks, stepSize: 1, precision: 0 },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        ...commonOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            return ` ${context.parsed.y} requests`;
          }
        }
      }
    }
  };

  return (
    <div className="dashboard-stats">
      {/* Stat Cards */}
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={stat.title} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="stat-card-header">
              <div className={`stat-icon bg-gradient-to-br ${stat.gradient} ${stat.glow}`}>
                {stat.icon}
              </div>
              <span className={`stat-trend ${stat.trendUp === true ? 'trend-up' : stat.trendUp === false ? 'trend-down' : 'trend-neutral'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-label">{stat.title}</p>
            <div className="stat-progress">
              <div className="stat-progress-bg">
                <div 
                  className={`stat-progress-fill bg-gradient-to-r ${stat.gradient}`} 
                  style={{ width: stat.barWidth }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Pie Chart */}
        <div className="chart-card" style={{ animationDelay: '0.3s' }}>
          <div className="chart-header">
            <div className="chart-title-group">
              <h3>Requests Per Service</h3>
              <p className="chart-subtitle">Distribution by category</p>
            </div>
            <span className="chart-badge">Distribution</span>
          </div>
          <div className="chart-container pie-chart-container">
            <Pie data={pieData} options={pieOptions} />
            {!hasPieData && (
              <div className="dummy-overlay">
                <span className="dummy-badge">Demo Data</span>
              </div>
            )}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="chart-card" style={{ animationDelay: '0.4s' }}>
          <div className="chart-header">
            <div className="chart-title-group">
              <h3>Projects Per Category</h3>
              <p className="chart-subtitle">Active projects overview</p>
            </div>
            <span className="chart-badge">Overview</span>
          </div>
          <div className="chart-container">
            <Bar data={barData} options={commonOptions} />
            {!hasBarData && (
              <div className="dummy-overlay">
                <span className="dummy-badge">Demo Data</span>
              </div>
            )}
          </div>
        </div>

        {/* Line Chart - Wide */}
        <div className="chart-card chart-card-wide" style={{ animationDelay: '0.5s' }}>
          <div className="chart-header">
            <div className="chart-title-group">
              <h3>Requests Over Time</h3>
              <p className="chart-subtitle">Last 7 days activity</p>
            </div>
            <span className="chart-badge">Trend</span>
          </div>
          <div className="chart-container line-chart-container">
            <Line data={lineChartData} options={lineOptions} />
            {!hasLineData && (
              <div className="dummy-overlay">
                <span className="dummy-badge">Demo Data</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;