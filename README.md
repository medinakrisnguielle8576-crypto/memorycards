"# memorycards" 
"# memorycards" # MemoryCards — Developer Guide

Overview
--------
MemoryCards is a flashcard web app built with [TECH STACK]. This document covers the architecture, development workflow, data formats, tests, and deployment.

Repository structure
--------------------
- /app — frontend app (React / Vue / Svelte)
- /api — backend (Node/Express or Python/Flask)
- /decks — sample decks and import/export files
- /scripts — build & helper scripts
- /tests — unit/integration tests

Local development
-----------------
Prerequisites:
- Node.js >= 18, npm/yarn
- Python 3.10+ (if backend is Python)
- Docker (optional for containerized dev)

Start services:
1. Install frontend deps:
   ```
   cd app
   npm install
   npm run dev
   ```
2. Start API:
   ```
   cd api
   pip install -r requirements.txt
   export FLASK_APP=app
   flask run --port=5000
   ```
3. (Optional) Use Docker Compose:
   ```
   docker-compose up --build
   ```

Card / Deck schema
------------------
Deck JSON schema (example):
```json
{
  "id": "deck-uuid",
  "title": "Deck Title",
  "description": "Optional description",
  "cards": [
    {
      "id": "card-uuid",
      "front": "Question or prompt",
      "back": "Answer",
      "tags": ["vocab", "chapter-1"],
      "meta": {"created_at":"2026-02-02T00:00:00Z"}
    }
  ]
}
```

API (example endpoints)
-----------------------
- GET /api/decks — list decks
- GET /api/decks/:id — get deck
- POST /api/decks — create deck (JSON body)
- POST /api/decks/:id/import — import deck file
- POST /api/study/:deckId/record — record study result

Testing
-------
- Unit tests:
  ```
  cd api
  pytest
  cd ../app
  npm test
  ```
- CI: see .github/workflows/ci.yml

Code style & linters
--------------------
- Frontend: ESLint + Prettier
- Backend: Black + Flake8 / isort
Run linters locally via:
```
npm run lint
pre-commit run --all-files
```

Deployment
----------
- Production build (frontend):
  ```
  cd app
  npm run build
  ```
- Backend: containerize with Docker, push to registry, and deploy to your host (e.g., Heroku, Vercel, Netlify or self-hosted)

Troubleshooting
---------------
- Database connection errors: check DB_URL in .env
- Import fails: validate JSON against schema

Contributing & Code Reviews
---------------------------
1. Fork the repo
2. Create a feature branch
3. Open a PR with a description and testing steps
4. Ensure tests pass in CI

Contact
-------
Maintainer: medinakrisnguielle8576-crypto
