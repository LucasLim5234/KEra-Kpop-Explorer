# KEra-Kpop-Explorer

KEra-Kpop-Explorer is a full-stack web application designed to explore, discuss and interact with K-pop content. The project consists of a Laravel-based backend (KEra-laravel) and a React-based frontend (KEra-react), providing a modern, scalable and interactive platform for K-pop fans. This project consumes also a public API (Ticketmaster API) to publish K-Pop concerts data. 

## Table of Contents
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Public API](#public-api)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
```
KEra-Kpop-Explorer/
├── KEra-laravel/
└── KEra-react/
```

## Tech Stack
### Backend (KEra-laravel)
- **Framework:** Laravel 12
- **Language:** PHP
- **Database:** PostgreSQL
- **Authentication:** Laravel Sanctum & Fortify
- **API:** RESTful, JSON

### Frontend (KEra-react)
- **Framework:** React
- **Build Tool:** Vite
- **Language:** JavaScript
- **Styling:** Bootstrap CSS
- **HTTP Client:** Axios API

## Features
- User authentication (register, login, password reset)
- Explore K-pop idols, posts, comments and quizzes
- Like, comment and interact with posts
- Public RESTful API (Ticketmaster API) for K-pop concerts data
- Responsive and modern UI
- Secure and scalable architecture

## Public API
The backend exposes a RESTful API for public consumption. Example endpoints:

- `GET /api/idols` — List all K-pop idols
- `GET /api/posts` — List all posts
- `GET /api/posts/{id}` — Get a single post
- `POST /api/posts` — Create a new post
- `POST /api/like` — Like a post
- `GET /api/quizzes` — List available quizzes
- `POST /api/quiz-attempt` — Submit a quiz attempt

## Getting Started
### Prerequisites
- Node.js
- PHP
- Composer
- PostgreSQL

### Backend Setup (Laravel)
1. `cd KEra-laravel`
2. `composer install`
3. Copy `.env.example` to `.env` and configure database
4. `php artisan key:generate`
5. `php artisan migrate --seed`
6. `php artisan serve`

### Frontend Setup (React)
1. `cd KEra-react`
2. `npm install`
3. `npm run dev`

## Contributing
Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
