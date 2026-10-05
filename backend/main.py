from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os
import sys

# Allow backend to import the AI code
AI_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "ai-gemma"))
sys.path.insert(0, AI_FOLDER)

from gemma import analyze_image


app = FastAPI()


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Pressure Point backend is running"}


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):

    allowed_types = ["image/png", "image/jpeg", "image/webp"]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only PNG, JPEG, and WebP images are allowed."
        )

    suffix = os.path.splitext(file.filename)[1]

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as temp_file:

            contents = await file.read()
            temp_file.write(contents)
            temp_path = temp_file.name

        result = analyze_image(temp_path)

        return result

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)