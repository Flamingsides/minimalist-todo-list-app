import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import TodoInput from './components/TodoInput.jsx'
import TodoList from './components/TodoList.jsx'

function loadState(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function saveState(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

export default function App() {
  const [todos, setTodos] = useState(() => loadState('todos', []))
  const [theme, setTheme] = useState(() => {
    const saved = loadState('theme', null)
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [period, setPeriod] = useState(() => loadState('period', 'day'))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    saveState('theme', theme)
  }, [theme])

  useEffect(() => { saveState('todos', todos) }, [todos])
  useEffect(() => { saveState('period', period) }, [period])

  const addTodo = useCallback(({ text, completed }) => {
    setTodos(prev => [{
      id: crypto.randomUUID(), text, completed,
      createdAt: new Date().toISOString(),
      completedAt: completed ? new Date().toISOString() : null,
    }, ...prev])
  }, [])

  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(t => t.id === id
      ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : null }
      : t))
  }, [])

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }, [])

  const editTodo = useCallback((id, text) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t))
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(t => !t.completed))
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  return (
    <main className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <Dashboard todos={todos} period={period} onChangePeriod={setPeriod} />
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} onClearCompleted={clearCompleted} />
    </main>
  )
}
