import { useState, useEffect } from 'react'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/movies/`)
      if (!response.ok) throw new Error('Failed to fetch movies')
      const data = await response.json()
      setMovies(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const handleAddMovie = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    try {
      const response = await fetch(`${API_BASE_URL}/movies/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      })
      if (!response.ok) throw new Error('Failed to add movie')
      const addedMovie = await response.json()
      setMovies((prev) => [addedMovie, ...prev])
      setNewTitle('')
    } catch (error) {
      console.error('Error adding movie:', error)
    }
  }

  const handleToggleWatched = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/?movie_id=${id}`, {
        method: 'PUT',
      })
      if (!response.ok) throw new Error('Failed to update status')
      const updated = await response.json()
      setMovies((prev) =>
        prev.map((movie) => (movie.id === id ? { ...movie, watched: updated.watched } : movie))
      )
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }

  const handleDeleteMovie = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/?movie_id=${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete movie')
      setMovies((prev) => prev.filter((movie) => movie.id !== id))
    } catch (error) {
      console.error('Error deleting movie:', error)
    }
  }

  // Filter logic
  const filteredMovies = movies.filter((movie) => {
    if (filter === 'watched') return movie.watched
    if (filter === 'unwatched') return !movie.watched
    return true
  })

  return (
    <>
      <div className="glow-orb glow-orb-1"></div>
      <div className="glow-orb glow-orb-2"></div>

      <main className="dashboard">
        <header className="header">
          <h1>CineTracker</h1>
          <p>Your ultimate glassmorphic companion to curate and track your watch lists.</p>
        </header>

        {/* Form Input */}
        <form onSubmit={handleAddMovie} className="add-movie-form">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="What are you watching next?"
              className="movie-input"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-add">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Movie
          </button>
        </form>

        {/* Filter Tabs and Actions */}
        <div className="list-actions">
          <div className="filter-tabs">
            <button
              onClick={() => setFilter('all')}
              className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unwatched')}
              className={`tab-btn ${filter === 'unwatched' ? 'active' : ''}`}
            >
              To Watch
            </button>
            <button
              onClick={() => setFilter('watched')}
              className={`tab-btn ${filter === 'watched' ? 'active' : ''}`}
            >
              Watched
            </button>
          </div>
        </div>

        {/* Loading and List */}
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="empty-state">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
            <p>No movies found. Start by adding one above!</p>
          </div>
        ) : (
          <section className="movie-list" aria-label="Movies">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className={`movie-item ${movie.watched ? 'watched' : ''}`}
              >
                <div className="movie-info">
                  <div>
                    <div className="movie-title">{movie.title}</div>
                    {movie.created_at && (
                      <div className="movie-date">
                        Added on {new Date(movie.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="movie-actions">
                  <button
                    onClick={() => handleToggleWatched(movie.id)}
                    className={`btn-toggle-watched ${movie.watched ? 'watched' : 'unwatched'}`}
                  >
                    {movie.watched ? 'Watched' : 'Mark Watched'}
                  </button>
                  <button
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="btn-delete"
                    title="Delete Movie"
                    aria-label={`Delete "${movie.title}"`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  )
}

export default App
