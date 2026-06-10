# College Discovery Platform

A full-stack premium educational platform split into a decoupled Frontend and Backend architecture.

## 📁 Project Structure

- `frontend/`: Next.js 14 web application (App Router).
- `backend/`: Node.js & Express API server with PostgreSQL.

## 🚀 Getting Started

### 1. Install Dependencies
Install dependencies for both projects from the root:
```bash
npm run install:all
```

### 2. Database Setup
Ensure you have a PostgreSQL database running and update the `.env` file in the `backend/` directory.

### 3. Run Development Servers
Start both frontend and backend concurrently:
```bash
npm run dev
```

Alternatively, run them separately:
- **Backend**: `npm run dev:backend` (Runs on http://localhost:5000)
- **Frontend**: `npm run dev:frontend` (Runs on http://localhost:3000)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TailwindCSS, Lucide React.
- **Backend**: Node.js, Express, PostgreSQL, Bcrypt, JWT (Jose).
- **Validation**: Zod (Shared logic).
- **Communication**: Next.js Rewrites (Proxying /api to Backend).

## 🔒 Security

- Stateless JWT authentication in HttpOnly cookies.
- Password hashing with Bcrypt.
- API Rate limiting on sensitive routes.
- Parameterized SQL queries for injection protection.
