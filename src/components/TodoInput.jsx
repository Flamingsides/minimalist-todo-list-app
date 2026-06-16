import { useState } from 'react'
import { parseInput } from '../utils/markdown.jsx'

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('');
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const parsed = parseInput(value);
      if (parsed) { onAdd(parsed); setValue(''); }
    }
  }
  return (
    <div className="input-area">
      <div className="input-wrapper">
        <span className="input-prefix" aria-hidden="true">―</span>
        <input className="todo-input" type="text" value={value} onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown} placeholder="Add a task… markdown supported"
          autoFocus autoComplete="off" spellCheck="true" aria-label="New task input" />
        <span className="input-hint" aria-hidden="true">↵</span>
      </div>
      <div className="markdown-hint" aria-hidden="true">
        <span><code>- task</code> list item</span>
        <span><code>- [x] task</code> done</span>
        <span><code>**bold**</code></span>
        <span><code>*italic*</code></span>
        <span><code>~~strike~~</code></span>
        <span><code>`code`</code></span>
      </div>
    </div>
  );
}
