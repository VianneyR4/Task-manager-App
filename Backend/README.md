# Task Manager API

A RESTful API for managing tasks with user authentication, built with Express and TypeScript.

## Features

- User authentication (JWT-based)
- CRUD operations for tasks
- Task prioritization and categorization
- TypeScript for type safety
- In-memory database with file persistence

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables file:
   ```bash
   cp .env.example .env
   ```
4. Update the environment variables in `.env` with your values

## Development

Start the development server:
```bash
npm run dev
```

The server will restart automatically when you make changes.

## Build

Compile the TypeScript code:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks

All task endpoints require authentication (JWT token in Authorization header)

- GET `/api/tasks` - Get all tasks for the authenticated user
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Request Examples

### Register User
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John Doe"}'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title": "New Task", "description": "Task description", "priority": "high"}'
```

## Testing

Run the test suite:
```bash
npm test
```

## License

ISC 