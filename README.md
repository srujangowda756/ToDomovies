# CineTracker

A modern, glassmorphic dark-themed web application to curate and track your movie watchlist. Built with a FastAPI backend and a React (Vite) frontend.

## Folder Structure

```
Movie/
├── backend/            # FastAPI Python backend
│   ├── routes/         # API routes
│   ├── model/          # SQLAlchemy database models
│   ├── schema/         # Pydantic schemas
│   ├── database.py     # SQLAlchemy configuration
│   ├── main.py         # App entrypoint
│   └── requirements.txt
├── frontend/           # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx     # Main React Dashboard
│   │   └── index.css   # Glassmorphic Styles
│   └── package.json
└── README.md           # Instructions
```

---

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- A PostgreSQL database (e.g. Neon DB) or SQLite

---

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file inside the `backend/` directory:
   ```env
   database_url=your_postgresql_connection_string_here
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will automatically create tables in your database and listen on `http://localhost:8000`.

---

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `frontend/` directory specifying the backend API URL:
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. Run the Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.
