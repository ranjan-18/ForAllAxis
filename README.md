# ForAllAxis Agency Website

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

ForAllAxis is a full-stack MERN (MongoDB, Express, React, Node.js) application for a professional agency website.

## 🚀 Tech Stack

- **Client:** React (Vite), TailwindCSS
- **Server:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Tooling:** Docker, GitHub Actions, Concurrently

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB
- Docker (optional)

## 🛠️ Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` in the root directory and update the values.
4. Run the development environment:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

- `npm run dev` - Run both client and server concurrently
- `npm run dev:server` - Run server in dev mode
- `npm run dev:client` - Run client in dev mode
- `npm run build` - Build the client
- `npm run start` - Start the production server
- `npm run lint` - Lint all code
- `npm run seed` - Seed the database

## 📂 Folder Structure

- `/client` - React frontend
- `/server` - Express backend
- `/shared` - Shared types/utils (if applicable)

## 🐳 Docker Deployment

To run the application using Docker:

```bash
docker-compose up --build
```

## 🤝 Contributing

Guidelines for contributing to the project...
