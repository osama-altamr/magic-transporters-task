# Magic Transporters

API for managing magic movers, items, and missions — create movers, load items, run missions, and view the leaderboard.

API runs at `http://localhost:3000`. Swagger docs at `/api-docs`.

## Setup & Run

### Option 1: Local MongoDB

If you have MongoDB installed locally:

```bash
git clone https://github.com/osama-altamr/magic-transporters-task.git
cd magic-transporters-task

npm install
```

Create a `.env` file:

```
NODE_ENV=local
PORT=3000
MONGO_URL=mongodb://localhost:27017/magic-transporters
```

Then run:

```bash
npm run dev
```

### Option 2: Docker

If you prefer Docker:

```bash
git clone https://github.com/osama-altamr/magic-transporters-task.git
cd magic-transporters-task

docker compose up -d
```

This starts the app and MongoDB. Use `docker compose up mongo -d` to run only MongoDB and use `npm run dev` for the app.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm test` | Run e2e tests |

**Author:** Osama Altamr
