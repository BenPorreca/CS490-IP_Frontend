import './test.scss';
import { useState, useEffect } from "react";

const images = [
  "https://i1.sndcdn.com/artworks-000165384395-rhrjdn-t500x500.jpg",
  "https://i1.sndcdn.com/artworks-000185743981-tuesoj-t500x500.jpg",
  "https://i1.sndcdn.com/artworks-000158708482-k160g1-t500x500.jpg",
  "https://i1.sndcdn.com/artworks-000062423439-lf7ll2-t500x500.jpg",
  "https://i1.sndcdn.com/artworks-000028787381-1vad7y-t500x500.jpg",
  "https://i1.sndcdn.com/artworks-000108468163-dp0b6y-t500x500.jpg",
  "https://i1.sndcdn.com/artworks-000064920701-xrez5z-t500x500.jpg",
];
function Carousel() {
  const [selectedIndex, setSelectedIndex] = useState(3); // start centered

  // Move carousel selection
  const moveToSelected = (direction) => {
    if (direction === "next") {
      setSelectedIndex((prev) => (prev + 1) % images.length);
    } else if (direction === "prev") {
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") moveToSelected("prev");
      if (e.key === "ArrowRight") moveToSelected("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Compute class for each slide
  const getClassName = (index) => {
    const diff = (index - selectedIndex + images.length) % images.length;

    if (index === selectedIndex) return "selected";
    if (diff === 1) return "next";
    if (diff === 2) return "nextRightSecond";
    if (diff === images.length - 1) return "prev";
    if (diff === images.length - 2) return "prevLeftSecond";
    if (diff < images.length / 2) return "hideRight";
    return "hideLeft";
  };

  return (
    <main>
      <div id="carousel">
        {images.map((src, index) => (
          <div
            key={index}
            className={getClassName(index)}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={src} alt={`carousel item ${index}`} />
          </div>
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => moveToSelected("prev")}>Prev</button>
        <button onClick={() => moveToSelected("next")}>Next</button>
      </div>
    </main>
  );
}

export default Carousel;