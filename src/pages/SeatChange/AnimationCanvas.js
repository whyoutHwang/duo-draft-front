import React, { useEffect, useRef } from "react";
import { characterImages } from "../../constants/characterImages";

function getRandomCharacter() {
  const characterKeys = Object.keys(characterImages);
  const randomIndex = Math.floor(Math.random() * characterKeys.length);
  const randomCharacterName = characterKeys[randomIndex];
  return characterImages[randomCharacterName];
}

function AnimationCanvas({ showAnimation, setShowAnimation, canvasRef }) {
  const imagesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (showAnimation && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      class ImageObject {
        constructor(x, y, size, imageUrl) {
          this.x = x;
          this.y = y;
          this.size = size;
          this.angle = Math.random() * Math.PI * 2;
          this.speed = Math.random() * 2 + 1;
          this.image = new Image();
          this.image.src = imageUrl;
          this.loaded = false;
          this.image.onload = () => {
            this.loaded = true;
          };
          this.image.onerror = () => {
            console.error("Failed to load image:", imageUrl);
            this.loaded = false;
          };
        }

        update() {
          this.x += Math.cos(this.angle) * this.speed;
          this.y += Math.sin(this.angle) * this.speed;
          if (
            this.x < -this.size ||
            this.x > canvas.width ||
            this.y < -this.size ||
            this.y > canvas.height
          ) {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 2 + 1;
          }
        }

        draw() {
          if (this.loaded) {
            context.save();
            context.translate(this.x, this.y);
            context.rotate(this.angle);
            context.drawImage(
              this.image,
              -this.size / 2,
              -this.size / 2,
              this.size,
              this.size
            );
            context.restore();
          }
        }
      }

      function createImages() {
        const numberOfImages = 50;
        imagesRef.current = Array(numberOfImages)
          .fill()
          .map(() => {
            const randomCharacter = getRandomCharacter();
            return new ImageObject(
              Math.random() * canvas.width,
              Math.random() * canvas.height,
              60,
              randomCharacter
            );
          });
      }

      function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        imagesRef.current.forEach((img) => {
          img.update();
          img.draw();
        });
        animationRef.current = requestAnimationFrame(animate);
      }

      createImages();
      animate();

      const timer = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        setShowAnimation(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [showAnimation, setShowAnimation]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-50"
    />
  );
}

export default AnimationCanvas;
