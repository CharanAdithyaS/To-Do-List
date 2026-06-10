import { useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Read a book for 30 minutes', completed: false },
    { id: 3, text: 'Go for a morning walk', completed: true },
  ])

  // Add a new todo item
  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  // Toggle a todo's completed status
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  // Delete a todo item
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // Edit an existing todo item
  const editTodo = (id, newText) => {
    const trimmed = newText.trim()
    if (!trimmed) return
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    )
  }

  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="app-wrapper">
      <Header totalCount={todos.length} completedCount={completedCount} />
      <main className="app-main">
        <ToDoList
          todos={todos}
          onAdd={addTodo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>
    </div>
  )
}

export default App
