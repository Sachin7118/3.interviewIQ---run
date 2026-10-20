# InterviewIQ.AI — Smart AI-Powered Mock Interview Platform

<div align="center">
  <img src="3.interviewIQ/client/src/assets/img1.png" alt="InterviewIQ.AI Banner" width="220" />
  <h3>Master Your Next Tech & HR Interview with Realistic AI Simulations</h3>
  <p>AI-driven spoken questions, real-time speech recognition, instant feedback, resume extraction, and downloadable performance reports.</p>
</div>

---

## 🌟 Key Features

- **🎙️ Real-time Voice & Spoken Interviews**: Interactive AI avatars asking role-specific technical and behavioral questions aloud with responsive voice playback.
- **🗣️ Speech Recognition & Audio Input**: Answer questions using your microphone; audio is transcribed directly into the interview assessment pipeline.
- **📄 Resume Analysis & Auto-Extraction**: Upload your PDF resume to generate tailored, personalized questions matching your experience level and domain skills.
- **🎯 Dual Modes**:
  - **Technical Interview**: Deep-dive domain concepts, system architecture, programming challenges, and problem solving.
  - **HR & Behavioral Interview**: STAR-method evaluations, workplace scenarios, leadership, and communication analysis.
- **📊 Comprehensive Scoring & Analytics**: Breakdown of final scores (out of 10), confidence metrics, strengths, weaknesses, and improvement roadmaps.
- **📑 Downloadable PDF Reports**: Export comprehensive, question-by-question interview reports generated via client-side PDF rendering.
- **📜 Complete Interview History**: Track your progress over time with stored sessions and report archives.
- **🔐 Secure Firebase Google Authentication**: Single sign-on with Google OAuth integrated with HTTP-only session tokens.

---

## 🖼️ Application UI & Workflow

<div align="center">
  <table>
    <tr>
      <td width="50%" align="center">
        <h4>1. Interview Setup & Resume Upload</h4>
        <img src="3.interviewIQ/client/src/assets/resume.png" alt="Resume Upload" width="100%" />
        <p><i>Upload your resume or configure role, seniority level, and topics.</i></p>
      </td>
      <td width="50%" align="center">
        <h4>2. Technical Interview Mode</h4>
        <img src="3.interviewIQ/client/src/assets/tech.png" alt="Technical Interview" width="100%" />
        <p><i>Live questions evaluated against industry-grade criteria.</i></p>
      </td>
    </tr>
    <tr>
      <td width="50%" align="center">
        <h4>3. HR & Behavioral Interview Mode</h4>
        <img src="3.interviewIQ/client/src/assets/HR.png" alt="HR Mode" width="100%" />
        <p><i>Realistic behavioral rounds testing soft skills and adaptability.</i></p>
      </td>
      <td width="50%" align="center">
        <h4>4. AI Feedback & Answer Analysis</h4>
        <img src="3.interviewIQ/client/src/assets/ai-ans.png" alt="AI Evaluation" width="100%" />
        <p><i>Line-by-line feedback with suggestions for ideal responses.</i></p>
      </td>
    </tr>
    <tr>
      <td width="50%" align="center">
        <h4>5. Performance & Confidence Scoring</h4>
        <img src="3.interviewIQ/client/src/assets/confi.png" alt="Scoring Dashboard" width="100%" />
        <p><i>Visual score metrics, answer quality breakdown, and tips.</i></p>
      </td>
      <td width="50%" align="center">
        <h4>6. Session History & Tracking</h4>
        <img src="3.interviewIQ/client/src/assets/history.png" alt="Interview History" width="100%" />
        <p><i>Access previous sessions, replay answers, and download reports.</i></p>
      </td>
    </tr>
    <tr>
      <td colspan="2" align="center">
        <h4>7. Exportable PDF Reports</h4>
        <img src="3.interviewIQ/client/src/assets/pdf.png" alt="PDF Report" width="60%" />
        <p><i>One-click export of structured interview evaluation reports.</i></p>
      </td>
    </tr>
  </table>
</div>

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 7, Tailwind CSS v4, Motion (Framer), Redux Toolkit, React Router v7, Lucide / React Icons |
| **Backend** | Node.js, Express 5, Mongoose (MongoDB ODM), Cookie-Parser, CORS |
| **Authentication** | Firebase Auth v12 (Google OAuth Provider), JSON Web Tokens (JWT) |
| **AI & LLM Services** | OpenRouter API (LLaMA / Claude / GPT models), PDF.js (Resume text extraction) |
| **PDF Generation** | jsPDF, jsPDF-AutoTable |
| **Payment Gateway** | Razorpay SDK (Free Community Access enabled) |

---

## 📁 Repository Structure

```text
3.interviewIQ - pro/
├── README.md
└── 3.interviewIQ/
    ├── client/                     # Frontend Single Page Application
    │   ├── public/
    │   │   ├── _redirects          # SPA client-side routing fallback
    │   │   └── img1.png
    │   ├── src/
    │   │   ├── assets/             # Images, audio avatars, and illustrations
    │   │   ├── components/         # Setup modals, interview runner, report cards
    │   │   ├── pages/              # Home, Auth, Interview, History, Pricing, Report
    │   │   ├── redux/              # User state slice & store
    │   │   ├── utils/              # Firebase singleton client
    │   │   ├── App.jsx             # Route definitions & base layout
    │   │   └── main.jsx
    │   ├── .env                    # Client environment config
    │   ├── package.json
    │   └── vite.config.js
    └── server/                     # Backend REST API
        ├── config/                 # DB connection and token generators
        ├── controllers/            # Auth, interview, user, and payment controllers
        ├── middlewares/            # JWT authentication & Multer upload
        ├── models/                 # User, Interview, and Payment MongoDB schemas
        ├── routes/                 # Express API routes
        ├── services/               # OpenRouter AI & Razorpay services
        ├── .env                    # Server environment secrets
        ├── index.js                # Server entrypoint & CORS middleware
        └── package.json
```

---

## ⚙️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- Google Firebase Account with Authentication enabled

### 1. Clone the Repository
```bash
git clone https://github.com/Sachin7118/3.interviewIQ---run.git
cd "3.interviewIQ---run"
```

### 2. Configure & Run Backend
```bash
cd "3.interviewIQ/server"
npm install
```

Create `.env` inside `3.interviewIQ/server/`:
```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
```

### 3. Configure & Run Frontend
In a new terminal window:
```bash
cd "3.interviewIQ/client"
npm install
```

Create `.env` inside `3.interviewIQ/client/`:
```env
VITE_FIREBASE_APIKEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_SERVER_URL=http://localhost:8000
```

Start the frontend:
```bash
npm run dev
```
Visit **`http://localhost:5173`** in your browser.

---

## 🔒 Firebase Authentication Configuration

To prevent `"This domain is not authorized in Firebase Console"`:

1. Open the **[Firebase Console](https://console.firebase.google.com/)** and select your project (`interviewiq-e9cc1`).
2. Navigate to **Build** → **Authentication** → **Settings**.
3. Under **Authorized domains**, click **Add domain**.
4. Add the following hostnames:
   - For local development: `localhost`
   - For production: Your deployed frontend domain (e.g., `your-app.onrender.com` or custom domain).
5. Ensure **Google** is enabled under **Authentication** → **Sign-in method**.

---

## 🚀 Production Deployment (Render)

### Backend Deployment (Render Web Service)
1. **Root Directory**: `3.interviewIQ/server`
2. **Environment**: `Node`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start` *(or `node index.js`)*
5. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `8000`
   - `MONGODB_URL`: `your_mongodb_connection_string`
   - `JWT_SECRET`: `your_jwt_secret`
   - `OPENROUTER_API_KEY`: `your_openrouter_api_key`
   - `CLIENT_URL`: `https://your-frontend-domain.onrender.com`

### Frontend Deployment (Render Static Site)
1. **Root Directory**: `3.interviewIQ/client`
2. **Build Command**: `npm install && npm run build`
3. **Publish Directory**: `dist`
4. **Environment Variables**:
   - `VITE_FIREBASE_APIKEY`: `your_firebase_api_key`
   - `VITE_SERVER_URL`: `https://your-backend-domain.onrender.com`

---

## 📜 License & Acknowledgments

Built with dedication for job seekers and software engineers worldwide. Free and open for developers preparing for high-impact careers.
