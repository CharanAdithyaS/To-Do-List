import './Header.css'

function Header({ totalCount, completedCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <span className="header-icon">✅</span>
          <div>
            <h1 className="header-title">My To-Do List</h1>
            <p className="header-subtitle">Stay on top of your day</p>
          </div>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card stat-card--done">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat-card stat-card--left">
            <span className="stat-number">{totalCount - completedCount}</span>
            <span className="stat-label">Left</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
