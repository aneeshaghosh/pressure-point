from gemma import analyze_image

screenshots = [
    "screenshots/urgency.png",
    "screenshots/scarcity.png",
    "screenshots/flight.png",
    "screenshots/optout.png",
    "screenshots/hotel.png"
]

for image_path in screenshots:
    print("\n" + "=" * 60)
    print("Analyzing:", image_path)
    print("=" * 60)

    result = analyze_image(image_path)

    print(result)