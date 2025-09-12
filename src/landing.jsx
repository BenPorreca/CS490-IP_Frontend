import { useState } from "react"
import './landing.css';
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";
const images = [image1, image2, image3, image4];

function Slideshow({images}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextButton = () => {
        setCurrentIndex((prevIndex) => (prevIndex+1)%images.length);
    };

    return(
        <div className="Slideshow">
            <img src={images[currentIndex]} alt="missingImage"/>
            <button onClick={nextButton}>Next</button>
        </div>
    );
}

function MainPage() {
    return(
        <main>
            <h1>Welcome To My Website</h1>
            <Slideshow images={images} />
        </main>
    );
}

export default MainPage