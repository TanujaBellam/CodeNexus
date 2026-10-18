# CodeArena 2.0 - How to run

You need: Node.js 18+, and MongoDB (or the zero-install option below).
Python / Java are only needed to run code in those languages.

## 1. Backend (Terminal 1)
    cd "back end"
    npm install
    npm run dev          # http://localhost:5001  -> questions are auto-seeded

No MongoDB installed? Run once:  npm i mongodb-memory-server
(the backend then starts its own temporary database automatically)

## 2. Frontend (Terminal 2)
    cd "front end"
    npm install
    npm run dev          # open the http://localhost:5173 link

## Checks
- http://localhost:5001  ->  "CodeArena AI API is running... (database: connected)"
- If the editor shows "Could not load questions", the red text now says exactly why.
- Re-seed manually any time:  cd "back end" && npm run seed
