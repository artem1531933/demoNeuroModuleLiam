import random
from PIL import Image, ImageDraw


class Pet:
    def __init__(self):
        self.image = Image.open("cat.png")
        self.draw = ImageDraw.Draw(self.image)

    def generate_pet(self):
        color = random.choice(["red", "blue", "green"])
        size = random.randint(50, 150)

        self.draw.rectangle([(100, 200), (300, 400)], fill=color, outline="white")
        self.image.save("generated_pet.png", optimize=True, quality=90)