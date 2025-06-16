# StudyMate

StudyMate is a real-time collaboration app for students. Users can register, create or join rooms, post content, and chat live.

## API Summary

### Auth
- POST `/api/auth/register` – register user
- POST `/api/auth/login` – log in

### Users
- GET `/api/users/me` – get logged-in user

### Rooms
- CRUD endpoints for study rooms

### Posts
- CRUD endpoints for posts within rooms

### WebSocket
Connect to `ws://localhost:3000/chat` and use events:
- `join-room` with `{ roomId }`
- `message` with `{ text }`
- Listen on `new-message`

## Docker
```bash
docker-compose up --build
