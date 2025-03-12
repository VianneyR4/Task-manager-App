# Task Manager Application

<div align="center">

![Task Manager Logo](Frontend/src/assets/images/logos/logo.svg)

A modern, full-stack task management application built with React and Node.js

[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)

[Features](#features) • [Getting Started](#getting-started) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

## 📋 Overview

Task Manager is a modern web application that helps users organize and track their tasks efficiently. Built with TypeScript, it provides a robust frontend using React and a scalable backend using Node.js.

## ✨ Features

- **🔐 User Authentication**
  - Secure registration and login
  - JWT-based authentication
  - Protected routes

- **📝 Task Management**
  - Create, read, update, and delete tasks
  - Task categorization
  - Priority levels
  - Due dates

- **🎨 User Interface**
  - Modern, responsive design
  - Intuitive user experience
  - Dark/Light mode support
  - Mobile-friendly layout

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. **Set up the Backend**
   ```bash
   cd Backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

3. **Set up the Frontend**
   ```bash
   cd Frontend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your API URL
   ```

### Configuration

#### Backend Environment Variables (.env)
```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
NODE_ENV=development
```

#### Frontend Environment Variables (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_VERSION=v1
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd Backend
   npm run dev
   ```
   The server will run on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## 🛠 Technology Stack

### Frontend
- **Core**: React 18, TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **API Documentation**: Swagger/OpenAPI

## 📖 Documentation

- [API Documentation](./Backend/docs/api.md)
- [Frontend Architecture](./Frontend/docs/architecture.md)
- [Database Schema](./Backend/docs/database.md)
- [Authentication Flow](./docs/auth-flow.md)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGithub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React Team for the amazing frontend library
- Node.js community for the robust backend runtime
- All contributors who have helped this project grow

---

<div align="center">
Made with ❤️ by [Your Name/Team]
</div>