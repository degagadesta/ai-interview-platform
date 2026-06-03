# AI Interview Platform

A comprehensive platform for conducting technical interviews with AI-powered code evaluation and real-time collaboration features.

## Features

- **User Management**: Role-based authentication (User, Admin, Interviewer)
- **Problem Library**: Curated coding problems with multiple difficulty levels
- **Code Submissions**: Multi-language code execution and evaluation
- **Interview Scheduling**: Schedule and manage technical interviews
- **AI Integration**: AI-powered code analysis and feedback
- **Real-time Collaboration**: WebSocket support for live interview sessions

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma ORM** for database management
- **JWT** authentication
- **WebSocket** for real-time features

### Key Dependencies
- `express` - Web framework
- `prisma` - Database ORM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `joi` - Request validation
- `helmet` - Security headers
- `cors` - Cross-origin resource sharing
- `morgan` - HTTP request logging

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-interview-platform.git
cd ai-interview-platform
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/interview_db"
PORT=3000
JWT_SECRET=your_jwt_secret
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Seed the database (optional):
```bash
npx prisma db seed
```

6. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Problems
- `GET /api/problems` - List all problems
- `GET /api/problems/:id` - Get problem details
- `POST /api/problems` - Create problem (Admin)
- `PUT /api/problems/:id` - Update problem (Admin)
- `DELETE /api/problems/:id` - Delete problem (Admin)

### Submissions
- `POST /api/submissions` - Submit code solution
- `GET /api/submissions` - Get user submissions
- `GET /api/submissions/:id` - Get submission details

### Interviews
- `POST /api/interviews` - Schedule interview
- `GET /api/interviews` - List interviews
- `GET /api/interviews/:id` - Get interview details
- `PUT /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Cancel interview

### AI
- `POST /api/ai/*` - AI-powered features

## Database Schema

### Models

**User**
- Authentication and user management
- Roles: USER, ADMIN, INTERVIEWER

**Problem**
- Coding problems with templates
- Difficulty levels: EASY, MEDIUM, HARD
- Support for multiple programming languages

**Submission**
- User code submissions
- Status tracking: PENDING, ACCEPTED, WRONG_ANSWER, etc.
- Execution results

**Interview**
- Interview scheduling and management
- Status: SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
- Links interviewer, candidate, and problems

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Database migrations
│   └── seed.js           # Database seeding
├── src/
│   ├── config/           # Configuration files
│   ├── middleware/       # Express middleware
│   ├── modules/          # Feature modules
│   │   ├── auth/        # Authentication
│   │   ├── problems/    # Problem management
│   │   ├── submissions/ # Code submissions
│   │   ├── interviews/  # Interview scheduling
│   │   └── ai/          # AI features
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
└── package.json
```

## Development

### Running Migrations
```bash
npx prisma migrate dev --name migration_name
```

### Viewing Database
```bash
npx prisma studio
```

### Database Reset
```bash
npx prisma migrate reset
```

## Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Helmet.js for security headers
- Input validation with Joi
- Role-based access control

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.
