import os
import json
from dotenv import load_dotenv
from google import genai
from PIL import Image
from prompt import DARK_PATTERN_PROMPT

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY was not found.")

client = genai.Client(api_key=api_key)


def analyze_image(image_path):
    image = Image.open(image_path)

    response = client.models.generate_content(
        model="gemma-4-26b-a4b-it",
        contents=[
            image,
            DARK_PATTERN_PROMPT
        ]
    )

    raw_response = response.text.strip()

    # Remove Markdown code fences if Gemma adds them
    if raw_response.startswith("```json"):
        raw_response = raw_response[7:]

    if raw_response.startswith("```"):
        raw_response = raw_response[3:]

    if raw_response.endswith("```"):
        raw_response = raw_response[:-3]

    raw_response = raw_response.strip()

    try:
        result = json.loads(raw_response)
    except json.JSONDecodeError:
        print("Gemma returned invalid JSON:")
        print(raw_response)
        return {"findings": []}

    return result