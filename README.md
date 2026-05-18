# Task Manager Application

A full-stack task management application built with React, Node.js, Express, and SQLite.

## Live Demo

Frontend: https://task-manager-ui-blush.vercel.app/
Backend API: https://task-manager-k6h9.onrender.com

## Features

- Create, view, edit, toggle, and delete tasks
- RESTful API built with Node.js and Express
- SQLite database persistence
- React frontend with loading and error handling
- Environment variable configuration
- Deployed frontend and backend

## Tech Stack

Frontend:
- React
- JavaScript
- CSS

Backend:
- Node.js
- Express
- SQLite
- better-sqlite3

Deployment:
- Vercel
- Render

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get one task |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| PATCH | /tasks/:id/toggle | Toggle completion |
| DELETE | /tasks/:id | Delete task |

## What I Learned

- Building RESTful APIs
- Connecting React to an Express backend
- Using SQLite for persistence
- Handling validation and errors
- Deploying a full-stack application