import { useMemo } from 'react'
import { startOfDay, startOfWeek, startOfMonth, getDayLabels, getWeekLabels, isSameDay } from '../utils/date.js'

function inRange(date, start, end) { return date >= start && date < end; }

export default function Dashboard({ todos, period, onChangePeriod }) {
  const now = new Date();
  const { stats, chartData, chartMax } = useMemo(() => {
    let pStart, pEnd, labels;
    if (period === 'day') {
      pStart = startOfDay(now); pEnd = new Date(pStart.getTime() + 86400000); labels = getDayLabels(now);
    } else if (period === 'week') {
      pStart = startOfWeek(now); pEnd = new Date(pStart.getTime() + 7 * 86400000); labels = getDayLabels(now);
    } else {
      pStart = startOfMonth(now); pEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1); labels = getWeekLabels(now);
    }
    const inPeriod = todos.filter(t => inRange(new Date(t.createdAt), pStart, pEnd));
    const total = inPeriod.length;
    const completed = inPeriod.filter(t => t.completed).length;
    const chartData = labels.map(({ date, label }) => {
      let bucket;
      if (period === 'day' || period === 'week') {
        bucket = todos.filter(t => isSameDay(new Date(t.createdAt), date));
      } else {
        const weekEnd = new Date(date.getTime() + 7 * 86400000);
        bucket = todos.filter(t => inRange(new Date(t.createdAt), date, weekEnd));
      }
      return { label, total: bucket.length, completed: bucket.filter(t => t.completed).length, isToday: isSameDay(date, now) };
    });
    return {
      stats: { total, completed, pending: total - completed, rate: total > 0 ? Math.round((completed / total) * 100) : 0 },
      chartData,
      chartMax: Math.max(...chartData.map(d => d.total), 1),
    };
  }, [todos, period]);

  const periodLabel = period === 'day' ? 'Today' : period === 'week' ? 'This Week' : 'This Month';
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>{periodLabel}</h2>
        <div className="period-toggle" role="group" aria-label="Period">
          {['day', 'week', 'month'].map(p => (
            <button key={p} className={`period-btn${period === p ? ' active' : ''}`} onClick={() => onChangePeriod(p)}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card"><span className="stat-label">Total</span><span className="stat-value accent">{stats.total}</span></div>
        <div className="stat-card"><span className="stat-label">Done</span><span className="stat-value success">{stats.completed}</span></div>
        <div className="stat-card"><span className="stat-label">Pending</span><span className="stat-value warning">{stats.pending}</span></div>
        <div className="stat-card"><span className="stat-label">Rate</span><span className="stat-value">{stats.rate}%</span></div>
      </div>
      {stats.total > 0 && <div className="progress-bar-wrap"><div className="progress-bar" style={{ width: `${stats.rate}%` }} /></div>}
      <div className="chart-area">
        {chartData.some(d => d.total > 0) ? (
          <div className="chart-bars" role="img" aria-label={`Task chart for ${periodLabel}`}>
            {chartData.map(({ label, total, completed, isToday }) => {
              const p = total - completed;
              const cH = total > 0 ? Math.max((completed / chartMax) * 52, completed > 0 ? 4 : 0) : 0;
              const pH = total > 0 ? Math.max((p / chartMax) * 52, p > 0 ? 4 : 0) : 0;
              return (
                <div key={label} className="chart-col" title={`${label}: ${completed}/${total} done`}>
                  <div className="chart-bar-wrap">
                    {pH > 0 && <div className="chart-bar pending" style={{ height: `${pH}px` }} />}
                    {cH > 0 && <div className="chart-bar completed" style={{ height: `${cH}px` }} />}
                  </div>
                  <span className="chart-label" style={{ fontWeight: isToday ? '700' : '400', color: isToday ? 'var(--accent)' : undefined }}>{label}</span>
                </div>
              );
            })}
          </div>
        ) : <div className="chart-empty">No tasks {periodLabel.toLowerCase()}</div>}
      </div>
    </div>
  );
}
