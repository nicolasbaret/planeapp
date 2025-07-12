# planeapp
what can be done on on a planeflight from slc to orlando...vibe coding with an agent

---

## Project Setup: Build, Compile, and Serve

### Frontend (React + Vite)

- **Start development server:**
  ```zsh
  cd frontend
  npm run dev
  ```
- **Build for production:**
  ```zsh
  cd frontend
  npm run build
  ```
- **Preview production build:**
  ```zsh
  cd frontend
  npm run preview
  ```

### Backend (Flask) with venv

- **Create and activate virtual environment:**
  ```zsh
  cd backend
  python3 -m venv venv
  source venv/bin/activate
  ```
- **Install dependencies:**
  ```zsh
  pip install -r requirements.txt
  ```
- **Run Flask server:**
  ```zsh
  python run.py
  ```

---

The frontend will run on port 5173 and the backend API on port 5000 by default. You can develop and test both locally.

Let me know if you want to automate, dockerize, or add more features!
