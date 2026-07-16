# Centram AI Website

A full-stack starter website for an AI training institution.

## Technology stack

- Frontend: React + Vite + React Router
- Backend: FastAPI + SQLAlchemy
- Database: SQLite by default
- API documentation: Swagger UI

## Project structure

```text
centram-ai/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   ├── security.py
│   │   └── seed.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── api.js
    │   ├── App.jsx
    │   └── styles.css
    └── package.json
```

## Run the backend

Open a terminal in the `backend` folder.

### Windows PowerShell

```powershell
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend URL: `http://127.0.0.1:8000`

Swagger API documentation: `http://127.0.0.1:8000/docs`

## Run the frontend

Open another terminal in the `frontend` folder.

```powershell
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## Main features included

- Responsive home page
- Course listing and filtering
- Course application form
- Events page
- Contact form
- User registration and login API
- Course and event management API endpoints
- SQLite database with starter data
- Editable React components and CSS

## Important development notes

The course and event creation endpoints are currently open for development convenience. Before production deployment, add administrator authentication and role-based access control.

To move from SQLite to PostgreSQL, replace `DATABASE_URL` in `backend/app/database.py`, install `psycopg`, and update the environment configuration.
