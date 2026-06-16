import { useState, useRef, useEffect } from 'react'
import { renderInlineMarkdown, parseInput } from '../utils/markdown.jsx'
import { formatDate } from '../utils/date.js'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, [editing]);

  function commitEdit() {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== todo.text) {
      const parsed = parseInput(trimmed);
      onEdit(todo.id, parsed ? parsed.text : trimmed);
    }
    setEditing(false);
  }

  return (
    <div className={`todo-item${todo.completed ? ' completed' : ''}`} role="listitem">
      <button className="todo-checkbox" onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        aria-checked={todo.completed} role="checkbox">
        {todo.completed && (
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </button>
      <div className="todo-body">
        {editing ? (
          <input ref={inputRef} className="todo-edit-input" value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commitEdit(); } else if (e.key === 'Escape') setEditing(false); }}
            aria-label="Edit task" />
        ) : (
          <div className="todo-text" onDoubleClick={() => { setEditValue(todo.text); setEditing(true); }} title="Double-click to edit">
            {renderInlineMarkdown(todo.text)}
          </div>
        )}
        <div className="todo-meta">{formatDate(todo.createdAt)}</div>
      </div>
      <div className="todo-actions">
        <button className="todo-action-btn" onClick={() => onDelete(todo.id)} aria-label="Delete task" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
