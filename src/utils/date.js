export function startOfDay(date) {
  const d = new Date(date); d.setHours(0, 0, 0, 0); return d;
}
export function startOfWeek(date) {
  const d = new Date(date); const day = d.getDay();
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day)); d.setHours(0, 0, 0, 0); return d;
}
export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
export function formatDate(dateStr) {
  const d = new Date(dateStr); const now = new Date();
  if (isSameDay(d, now)) return 'Today';
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  if (isSameDay(d, yesterday)) return 'Yesterday';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
export function getDayLabels(referenceDate) {
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(referenceDate); d.setDate(d.getDate() - i);
    labels.push({ date: startOfDay(d), label: d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2) });
  }
  return labels;
}
export function getWeekLabels(referenceDate) {
  const labels = []; const monthStart = startOfMonth(referenceDate);
  for (let i = 0; i < 5; i++) {
    const weekStart = new Date(monthStart); weekStart.setDate(monthStart.getDate() + i * 7);
    if (weekStart.getMonth() !== referenceDate.getMonth()) break;
    labels.push({ date: startOfDay(weekStart), label: `W${i + 1}` });
  }
  return labels;
}
