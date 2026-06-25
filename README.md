# AI Interview Platform

A comprehensive platform for conducting technical interviews with AI-powered code evaluation and real-time collaboration features.

## Features

- **User Management**: Role-based authentication (User, Admin, Interviewer)
- **Problem Library**: Curated coding problems with multiple difficulty levels
- **Code Submissions**: Multi-language code execution via Judge0 API
- **Interview Scheduling**: Schedule and manage technical interviews
- **AI-Powered Feedback**: OpenAI integration for code analysis and suggestions
- **Real-time Collaboration**: WebSocket-based live interview rooms
- **Live Code Sharing**: Real-time code editor synchronization
- **Interview Chat**: Built-in chat for interviewer-candidate communication
- **Docker Support**: Containerized deployment with docker-compose

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma ORM** for database management
- **JWT** authentication
- **WebSocket** for real-time features

### Key Dependencies
- `express` - Web framework
- `socket.io` - Real-time bidirectional communication
- `prisma` - Database ORM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `axios` - HTTP client for external APIs
- `joi` - Request validation
- `helmet` - Security headers
- `cors` - Cross-origin resource sharing
- `morgan` - HTTP request logging

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- Docker & Docker Compose (optional)
- OpenAI API Key (for AI features)
- Judge0 API Key (for code execution)

### Quick Start with Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-interview-platform.git
cd ai-interview-platform
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your API keys and configuration.

3. Start all services:
```bash
docker-compose up -d
```

4. Run database migrations:
```bash
docker-compose exec backend npx prisma migrate dev
docker-compose exec backend npm run seed
```

The server will be available at `http://localhost:3000`

For detailed setup instructions, see [SETUP.md](SETUP.md)

### Installation

#### Local Development

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
OPENAI_API_KEY=sk-your-openai-key
JUDGE0_API_KEY=your-judge0-key
JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
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
- `POST /api/ai/feedback` - Get AI feedback on submission
- `POST /api/ai/suggestions` - Get code improvement suggestions

## WebSocket Events

The platform supports real-time collaboration through WebSocket connections.

### Client Connection
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: { token: 'your-jwt-token' }
});
```

### Events
- `join-interview` - Join interview room
- `leave-interview` - Leave interview room
- `code-change` - Real-time code synchronization
- `code-execution` - Share execution results
- `chat-message` - Interview chat
- `select-problem` - Problem selection
- `update-interview-status` - Status updates

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

### Running with Docker
```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild
docker-compose up -d --build
```

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
