export function parseInput(raw) {
  let text = raw.trim();
  if (!text) return null;
  let completed = false;
  if (/^-\s+\[x\]\s+/i.test(text)) { completed = true; text = text.replace(/^-\s+\[x\]\s+/i, ''); }
  else if (/^-\s+\[\s\]\s+/.test(text)) { text = text.replace(/^-\s+\[\s\]\s+/, ''); }
  else if (/^[-*]\s+/.test(text)) { text = text.replace(/^[-*]\s+/, ''); }
  else if (/^\d+\.\s+/.test(text)) { text = text.replace(/^\d+\.\s+/, ''); }
  return { text: text.trim(), completed };
}

export function renderInlineMarkdown(text) {
  const parts = []; let remaining = text; let key = 0;
  const patterns = [
    { re: /\*\*(.+?)\*\*/, tag: 'strong' },
    { re: /\*(.+?)\*/, tag: 'em' },
    { re: /~~(.+?)~~/, tag: 'del' },
    { re: /`(.+?)`/, tag: 'code' },
  ];
  while (remaining.length > 0) {
    let earliest = null; let earliestIndex = Infinity;
    for (const p of patterns) {
      const m = p.re.exec(remaining);
      if (m && m.index < earliestIndex) { earliest = { ...p, match: m }; earliestIndex = m.index; }
    }
    if (!earliest) { parts.push(remaining); break; }
    if (earliestIndex > 0) parts.push(remaining.slice(0, earliestIndex));
    const Tag = earliest.tag;
    parts.push(<Tag key={key++}>{renderInlineMarkdown(earliest.match[1])}</Tag>);
    remaining = remaining.slice(earliestIndex + earliest.match[0].length);
  }
  return parts;
}
