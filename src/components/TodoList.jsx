import { useState } from 'react'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, onToggle, onDelete, onEdit, onClearCompleted }) {
  const [filter, setFilter] = useState('all');
  const filtered = todos.filter(t => filter === 'active' ? !t.completed : filter === 'done' ? t.completed : true);
  const completedCount = todos.filter(t => t.completed).length;
  return (
    <div>
      <div className="filter-bar">
        <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
          {[{key:'all',label:'All'},{key:'active',label:'Active'},{key:'done',label:'Done'}].map(({ key, label }) => (
            <button key={key} role="tab" aria-selected={filter === key}
              className={`filter-tab${filter === key ? ' active' : ''}`} onClick={() => setFilter(key)}>
              {label}
              {key === 'all' && todos.length > 0 && ` (${todos.length})`}
              {key === 'active' && todos.length > 0 && ` (${todos.length - completedCount})`}
              {key === 'done' && completedCount > 0 && ` (${completedCount})`}
            </button>
          ))}
        </div>
        {completedCount > 0 && <button className="clear-completed-btn" onClick={onClearCompleted}>Clear done</button>}
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon" aria-hidden="true">{filter==='done'?'✓':filter==='active'?'○':'✦'}</div>
          <p>{filter==='done'?'No completed tasks yet':filter==='active'?'No active tasks — great job!':'Add your first task above'}</p>
        </div>
      ) : (
        <div className="todo-list" role="list">
          {filtered.map(todo => <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />)}
        </div>
      )}
    </div>
  );
}
