import { useState } from 'react'
import './ToDoItem.css'

function ToDoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)

  const handleEditSave = () => {
    if (editValue.trim()) {
      onEdit(todo.id, editValue)
    } else {
      setEditValue(todo.text) // revert if empty
    }
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') {
      setEditValue(todo.text)
      setIsEditing(false)
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'todo-item--done' : ''}`}>
      {/* Checkbox */}
      <button
        className={`todo-check ${todo.completed ? 'todo-check--checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Text / Edit input */}
      {isEditing ? (
        <input
          className="todo-edit-input"
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditSave}
          onKeyDown={handleEditKeyDown}
          autoFocus
          maxLength={120}
        />
      ) : (
        <span
          className="todo-text"
          onDoubleClick={() => {
            setEditValue(todo.text)
            setIsEditing(true)
          }}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {/* Action buttons */}
      <div className="todo-actions">
        {!isEditing && (
          <button
            className="action-btn action-btn--edit"
            onClick={() => {
              setEditValue(todo.text)
              setIsEditing(true)
            }}
            aria-label="Edit task"
            title="Edit"
          >
            ✏️
          </button>
        )}
        <button
          className="action-btn action-btn--delete"
          onClick={() => onDelete(todo.id)}
          aria-label="Delete task"
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  )
}

export default ToDoItem
