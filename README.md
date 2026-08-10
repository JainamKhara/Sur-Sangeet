# 🎵 SurSangeet — 5D KNN Audio Vector Sound Deck

SurSangeet is a full-stack, AI/ML-powered music discovery platform and interactive studio deck. It utilizes **K-Nearest Neighbors (KNN)** with **Cosine Distance** vector matching across 18,154 real Spotify & YouTube tracks in a 5-dimensional audio vector space (danceability, energy, acousticness, valence, tempo) to construct personalized playlists based on real-time acoustic preferences.

---

## ✨ Key Features

- **5D Vector Calibration Wizard**: Interactive 3-stage wizard for fine-tuning target mood, activity, groove, timbre, tempo, and song limits.
- **K-Nearest Neighbors (KNN) Vector Engine**: Fast cosine-distance audio matching on 18,154 normalized audio track vectors.
- **Dual Visual Themes**: Seamless Light Mode (tactile studio white) & Dark Mode (brutalist studio dark) with high-contrast typography.
- **Hi-Fi Analog Turntable Deck Stage**: Tactile spinning vinyl disc, dynamic tonearm movement, timeline scrubber seeking, repeat modes, and volume sliders.
- **YouTube Audio Streaming Engine**: Seamless background audio playback via YouTube IFrame API with image fallbacks.
- **Neon Cloud PostgreSQL Vector Persistence**: High-speed cloud database holding 18,154 tracks with normalized acoustic vectors.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router, Turbopack, TypeScript)
- **Styling**: Tailwind CSS (with custom brutalist studio tokens and HSL color modes)
- **Icons & Motion**: Lucide React Icons, Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query v5
- **Audio Engine**: YouTube IFrame Player API

### Backend
- **Framework**: FastAPI (Python 3.10+)
- **Database**: PostgreSQL (Neon Cloud Serverless) & SQLAlchemy ORM
- **ML / Vector Computation**: Scikit-Learn (`NearestNeighbors`), NumPy, Pandas
- **Server**: Uvicorn (ASGI)

---

## 📁 Repository Structure

```text
SurSangeet/
├── backend/
├── app/
│   ├── main.py                   # FastAPI app, CORS, and endpoint definitions
│   ├── models.py                 # SQLAlchemy Song model schema
│   ├── schemas.py                # Pydantic request & response schemas
│   ├── database.py               # Neon PostgreSQL connection pooling
│   └── ml/
│       └── recommendations.py    # 5D KNN Cosine Distance Recommendation Engine
│   ├── seed_data.py              # Ingests Spotify/YouTube dataset into Neon DB
│   ├── requirements.txt          # Python dependencies
│   └── .env                      # Environment config (DATABASE_URL)
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Homepage with vector engine showcase
│   │   │   ├── calibrate/
│   │   │   │   └── page.tsx      # Vector Calibration Wizard page
│   │   │   ├── player/
│   │   │   │   └── page.tsx      # Interactive Hi-Fi Studio Player page
│   │   │   ├── layout.tsx        # Root layout, fonts, and theme providers
│   │   │   └── globals.css       # Design system tokens & Light/Dark theme overrides
│   │   ├── components/
│   │   │   ├── Navbar.tsx        # Navigation header with theme switcher & status
│   │   │   ├── QuestionnaireWizard.tsx # 3-stage 5D vector calibration wizard
│   │   │   ├── SongCard.tsx      # Track cards for vector queue
│   │   │   └── Player.tsx        # Bottom player bar component
│   │   ├── store/
│   │   │   └── usePlayerStore.ts # Zustand global player & queue state
│   │   └── context/
│   │       └── ThemeContext.tsx  # Light/Dark mode context provider
│   ├── package.json
│   └── next.config.ts
└── README.md                     # Comprehensive documentation
```

---

## 🚀 How to Run the Project (Step-by-Step)

### Prerequisites
Make sure you have installed on your system:
- **Node.js** v18.0.0 or higher
- **Python** 3.10 or higher
- **Git**

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/JainamKhara/Sur-Sangeet.git
cd Sur-Sangeet
```

---

### Step 2: Set Up & Run the Backend (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file inside the `backend/` folder with your database credentials:
   ```env
   DATABASE_URL=postgresql://neondb_owner:npg_140MpxQivchd@ep-calm-wildflower-aycpps3m-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

5. *(Optional)* Seed the database with 18,154 Spotify & YouTube tracks:
   ```bash
   python seed_data.py
   ```

6. Start the FastAPI backend server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   The backend will start running at **`http://localhost:8000`**.  
   - Interactive API docs (Swagger UI): `http://localhost:8000/docs`
   - Alternative API docs (ReDoc): `http://localhost:8000/redoc`

---

### Step 3: Set Up & Run the Frontend (Next.js)

1. Open a new terminal window and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. *(Optional)* Create a `.env.local` file inside the `frontend/` folder if configuring a custom API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open your web browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 🧮 How the ML Recommendation Engine Works

1. **5D Acoustic Vector Space**:
   Every track is normalized into a 5-dimensional audio vector:
   $$\vec{v} = [\text{danceability}, \text{energy}, \text{valence}, \text{acousticness}, \text{tempo}]$$

2. **K-Nearest Neighbors Cosine Distance**:
   The engine computes the **Cosine Similarity** between the target preference vector $\vec{A}$ calibrated by the user and the track vectors $\vec{B}$ in Neon PostgreSQL:
   $$\text{Cosine Similarity} = \frac{\vec{A} \cdot \vec{B}}{\|\vec{A}\| \|\vec{B}\|}$$

3. **Artist Diversity Filter**:
   Candidates undergo an artist deduplication pass to ensure diverse, balanced playlist recommendations without artist clustering.

---

## 📡 Key API Endpoints

### `POST /api/recommend`
Generates a recommended playlist matching user vector preferences.

**Sample Request**:
```json
{
  "mood": "Energetic",
  "activity": "Workout",
  "danceability": 0.8,
  "energy": 0.9,
  "acousticness": 0.15,
  "tempo": 0.75,
  "limit": 15
}
```

**Sample Response**:
```json
{
  "playlist": [
    {
      "id": 1042,
      "title": "Starboy",
      "artist": "The Weeknd",
      "youtube_id": "34Na4j8AVgA",
      "thumbnail_url": "https://i.ytimg.com/vi/34Na4j8AVgA/hqdefault.jpg",
      "duration": 230,
      "genre": "Pop / R&B"
    }
  ]
}
```

---

## 🔧 Troubleshooting

- **Port 8000 in use**: Run `uvicorn app.main:app --reload --port 8001` and set `NEXT_PUBLIC_API_URL=http://localhost:8001` in `frontend/.env.local`.
- **CORS Error**: Ensure `CORS_ORIGINS` in `backend/.env` includes your Next.js URL (`http://localhost:3000`).
- **Database Connection Warning**: Verify `DATABASE_URL` in `backend/.env` is accessible and has `?sslmode=require`.

---

## 📜 License

Distributed under the **MIT License**. Free for educational and open-source use.
