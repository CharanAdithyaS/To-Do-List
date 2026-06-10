import { useState } from 'react'
import ToDoItem from './ToDoItem'
import './ToDoList.css'

function ToDoList({ todos, onAdd, onToggle, onDelete, onEdit }) {
  const [inputText, setInputText] = useState('')
  const [filter, setFilter] = useState('all')

  const handleAdd = () => {
    if (!inputText.trim()) return
    onAdd(inputText)
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="todolist-container">
      {/* Add new task input */}
      <div className="add-task-row">
        <input
          className="add-task-input"
          type="text"
          placeholder="What do you need to do?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={120}
        />
        <button className="add-task-btn" onClick={handleAdd}>
          + Add
        </button>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {['all', 'active', 'completed'].map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Task list */}
      <ul className="todo-ul">
        {filteredTodos.length === 0 ? (
          <li className="empty-state">
            {filter === 'completed'
              ? "Nothing completed yet — keep going! 💪"
              : filter === 'active'
              ? "All caught up! Nothing left to do 🎉"
              : "No tasks here. Add one above!"}
          </li>
        ) : (
          filteredTodos.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </ul>

      {/* Footer info */}
      {todos.length > 0 && (
        <div className="todolist-footer">
          {todos.filter((t) => !t.completed).length} task
          {todos.filter((t) => !t.completed).length !== 1 ? 's' : ''} remaining
        </div>
      )}
    </div>
  )
}

export default ToDoList
