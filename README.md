<img width="266" height="45" alt="logo" src="https://github.com/user-attachments/assets/476106bb-a005-407a-b795-e89955deac3e" />

A real-time video calling application built with **React, WebRTC, Socket.IO, Express, and MongoDB**.

PeerToPeer allows users to create and join protected meeting rooms with real-time audio/video communication, camera and microphone controls, device switching, and multi-user video calling.

**Live Demo:** https://peertopeer.shivrajprojects.co.in

---

## Screenshots

### Home

<img width="959" height="448" alt="image" src="https://github.com/user-attachments/assets/4c3d5519-69f7-486f-a0c1-a6d6cb792aad" />
<img width="959" height="449" alt="image" src="https://github.com/user-attachments/assets/2e5e23f2-3b50-414b-84a4-7628803b25f4" />

### Meeting Setup

<img width="959" height="449" alt="image" src="https://github.com/user-attachments/assets/f1d6c0d8-2ebb-445a-9024-c187596f6e38" />

### Video Call

<img width="959" height="449" alt="image" src="https://github.com/user-attachments/assets/2b3385ad-ba44-48ca-9481-acac2c03cd5b" />

---

## Tech Stack

### Frontend

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="45" />
</p>

* React
* Vite
* JavaScript
* React Router
* Axios
* Tailwind CSS
* shadcn/ui

### Backend

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="45" />
</p>

* Node.js
* Express.js
* Socket.IO
* MongoDB
* Mongoose
* JWT
* HTTP-only Cookies

### Real-Time Communication

* WebRTC
* Socket.IO
* STUN
* ICE Candidates
* RTCPeerConnection
* WebRTC MediaStreams

---

## Features

### Authentication

* User registration and login
* JWT-based authentication
* HTTP-only authentication cookies
* Protected routes
* Authenticated Socket.IO connections

### Video Calling

* Real-time audio and video
* Multi-user video rooms
* WebRTC peer-to-peer communication
* Camera toggle
* Microphone toggle
* Device switching
* Local and remote media streams
* Participant management

### Meeting Rooms

* Create protected meeting rooms
* Join meetings using a meeting ID
* Server-side meeting validation
* Duplicate-user prevention
* Room membership verification
* Host-controlled meeting lifecycle
* Automatic participant removal on disconnect

### Real-Time Signaling

Socket.IO is used as the signaling layer for WebRTC.

It handles:

* Joining rooms
* New user notifications
* WebRTC offers
* WebRTC answers
* ICE candidates
* Camera state
* User disconnection
* Meeting termination

---

## How It Works

The application uses **WebRTC for media communication** and **Socket.IO for signaling**.

```text
                    PeerToPeer

              ┌──────────────────┐
              │   React Client   │
              └────────┬─────────┘
                       │
                 Socket.IO
                 Signaling
                       │
              ┌────────▼─────────┐
              │ Express + Socket │
              │      Server      │
              └────────┬─────────┘
                       │
          ┌────────────┴────────────┐
          │                         │
       MongoDB                  WebRTC
   Authentication            Peer Connection
   Meeting Data              Audio / Video
```

### WebRTC Flow

```text
User A                         Signaling Server                    User B

  │                                   │                              │
  │────── join-room ─────────────────>│                              │
  │                                   │<────── join-room ────────────│
  │                                   │                              │
  │<────── new-user ──────────────────│                              │
  │                                   │                              │
  │────── WebRTC Offer ──────────────>│────── Offer ────────────────>│
  │                                   │                              │
  │<──── WebRTC Answer ───────────────│<──── Answer ─────────────────│
  │                                   │                              │
  │────── ICE Candidate ─────────────>│────── ICE Candidate ────────>│
  │<───── ICE Candidate ──────────────│<──── ICE Candidate ──────────│
  │                                   │                              │
  └═══════════════════════════════════╪══════════════════════════════┘
                                      │
                              Signaling only

             Audio / Video travels directly through WebRTC
```

Socket.IO does **not** carry the actual video stream. It is used to exchange the information required to establish the WebRTC connection.

---

## Authentication Flow

```text
Client
  │
  │ Login
  ▼
Express API
  │
  │ Generate JWT
  ▼
HTTP-only Cookie
  │
  ▼
Authenticated Requests
  │
  └──────────────► Socket.IO
                         │
                         ▼
                  Verify JWT Cookie
                         │
                         ▼
                  socket.data.username
```

The server authenticates the Socket.IO connection using the JWT stored in the HTTP-only cookie.

---

## Project Structure

```text
PeerToPeer/
│
├── Client/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   └── pages/
│   │       ├── App.jsx
│   │       ├── AuthContext.jsx
│   │       ├── Home.jsx
│   │       ├── index.css
│   │       ├── Login.jsx
│   │       ├── main.jsx
│   │       ├── MediaContext.jsx
│   │       ├── Navbar.jsx
│   │       ├── ProtectedRoute.jsx
│   │       ├── RoomGuard.jsx
│   │       ├── Signup.jsx
│   │       ├── SocketContext.jsx
│   │       ├── VideoCallLayout.jsx
│   │       ├── VideoCallRoom.jsx
│   │       ├── VideoCallSetup.jsx
│   │       └── VideoCallSocketLayout.jsx
│   ├── .env
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vercel.json
│   └── vite.config.js
│
├── Server/
│   ├── Controllers/
│   │   ├── AuthController.js
│   │   └── MeetController.js
│   ├── Middlewares/
│   │   ├── AuthMiddleware.js
│   │   └── MeetMiddeware.js
│   ├── Models/
│   │   ├── meetModel.js
│   │   └── UserModel.js
│   ├── node_modules/
│   ├── Routes/
│   │   ├── AuthRouter.js
│   │   └── MeetRouter.js
│   ├── Sockets/
│   │   ├── Services/
│   │   ├── index.js
│   │   ├── meetSocket.js
│   │   └── socketMiddleware.js
│   ├── Utils/
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
│
└── README.md
```

---

## Environment Variables

### Client

Create a `.env` file inside `Client/`:

```env
VITE_SERVER_URL=http://localhost:8080
```

For production:

```env
VITE_API_URL=https://api.peertopeer.shivrajprojects.co.in
```

### Server

Create a `.env` file inside `Server/`:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Never commit `.env` files or secret credentials to GitHub.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/SHIVRAJSINGHDEORA/peerTopeer.git
cd PeerToPeer
```

### Install Client dependencies

```bash
cd Client
npm install
```

### Install Server dependencies

```bash
cd ../Server
npm install
```

---

## Running Locally

### Start the backend

```bash
cd Server
npm start
```

### Start the frontend

Open another terminal:

```bash
cd Client
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

The backend will normally run on:

```text
http://localhost:8080
```

---

## Deployment

### Frontend

The React frontend is deployed using Vercel.

```text
https://peertopeer.shivrajprojects.co.in
```

### Backend

The Express + Socket.IO backend is deployed separately because the application requires a persistent Socket.IO server.

```text
https://api.peertopeer.shivrajprojects.co.in
```

### Database

MongoDB Atlas is used for persistent application data.

---

## Key Concepts Used

This project helped me work with several important real-time web concepts:

* WebRTC peer connections
* RTCPeerConnection
* MediaStream API
* STUN servers
* ICE candidate exchange
* Socket.IO signaling
* WebSocket communication
* JWT authentication
* HTTP-only cookies
* Protected routes
* React Context API
* Express middleware
* MongoDB/Mongoose
* CORS with credentials
* Real-time room management

---

## Future Improvements

* Screen sharing
* Chat inside meetings
* Meeting recording
* Better reconnection handling
* TURN server support
* Persistent meeting history
* Improved mobile UI
* End-to-end encrypted signaling
* Better connection-quality indicators

---

## Author

**Shivraj Singh Deora**

B.Tech CSE — IIIT Bhopal

GitHub: [SHIVRAJSINGHDEORA](https://github.com/SHIVRAJSINGHDEORA/)

---

## License

This project is built for learning and demonstration purposes.
