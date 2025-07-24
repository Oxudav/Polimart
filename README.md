# Polimart Backend

## Description
This is the backend for the Polimart media upload and authentication system. It allows users to upload media files, list uploaded media, and download them securely. It also implements JWT-based authentication.

## Requirements
- Node.js
- MongoDB
- Postman (for testing APIs)

## Setup

1. Clone the repo
2. Run `npm install` to install dependencies
3. Create a `.env` file with the following content:
   MONGO_URI=mongodb://localhost:27017/polimart
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
4. Run MongoDB locally or use a cloud service (MongoDB Atlas).
5. Run the app with `npm start`.

## Endpoints
- `POST /auth/login`: Login user and receive JWT token
- `POST /media/upload`: Upload media file (requires JWT)
- `GET /media`: List all uploaded media (requires JWT)
- `GET /media/:id`: Download a media file (requires JWT)
