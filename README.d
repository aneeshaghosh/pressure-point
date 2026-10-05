PRESSURE POINT

Exposing the hidden psychology of digital interfaces

Pressure Point is an AI-powered tool that analyzes screenshots of websites and digital interfaces to identify potentially manipulative design patterns.

We built it around a simple question:

Can an interface push users toward a decision without them realizing it?

Pressure Point looks at the visible text and visual elements in an interface and identifies patterns that may create pressure or influence user decisions. It also points to the relevant part of the screenshot and explains why it was flagged.

WHAT IT DETECTS

Artificial Urgency – Countdown timers and limited-time messages that create time pressure.

Scarcity Pressure – Messages such as "Only 2 left" or indicators suggesting high demand.

Hidden Charges – Additional fees that appear later during a purchase or checkout process.

Difficult Opt-Out – When accepting an option is made much more prominent or easier than declining it.

Misleading Visual Emphasis – When one comparable option is given substantially more visual prominence than another.

HOW IT WORKS

A screenshot is uploaded through the React frontend.

The image is sent to our FastAPI backend.

The backend passes the screenshot to Gemma along with our detection prompt.

Gemma analyzes the interface and returns structured JSON containing the detected patterns, evidence, explanations, confidence scores, and approximate locations.

The frontend then displays the findings and highlights the relevant elements on the screenshot.

TECH STACK

Frontend: React, Vite, CSS

Backend: Python, FastAPI, Uvicorn

AI: Gemma, Gemini API, Google GenAI SDK

Other: Pillow, JSON, Git and GitHub

PROJECT STRUCTURE

pressure-point/
├── ai-gemma/
│ ├── gemma.py
│ └── prompt.py
├── backend/
│ └── main.py
├── src/
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ └── main.jsx
├── screenshots/
├── .gitignore
├── index.html
├── package.json
└── package-lock.json

RUNNING LOCALLY

Clone the repository and open the project folder.

Create a Python virtual environment and install the required dependencies.

Create a .env file in the project root and add your Gemini API key:

GEMINI_API_KEY=your_api_key_here

Do not commit the .env file.

Start the backend using:

cd backend
python -m uvicorn main:app --reload

Then, in another terminal, install the frontend dependencies and start the development server:

npm install
npm run dev

Open the local Vite URL shown in the terminal.

IMPORTANT LIMITATION

Pressure Point identifies observable interface patterns based on visual and textual evidence. It does not determine the intentions of a company or designer.

A detected pattern does not establish that a company deliberately tried to deceive users.

The confidence score represents confidence that the observable pattern exists, not confidence about the company's intent.

WHY WE BUILT IT

Dark patterns can be subtle. A countdown, an extra fee, a highlighted button, or a difficult-to-find alternative can influence a user's decision without being immediately obvious.

We wanted to build a tool that makes these patterns easier to see, understand, and question.

TEAM BEYOND BINARY

Built by a team of first-year B.Tech students at VIT Chennai.

Aneesha Ghosh 

Shridula.V

Srivarshini.S

HACK DAY

Built for Hacktoberfest 2026 Hack Day at VIT Chennai.

This project explores how open-weight AI models can be used to analyze real-world digital interfaces and make their design choices more transparent.
