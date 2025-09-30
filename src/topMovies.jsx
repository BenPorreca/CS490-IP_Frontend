import { useEffect, useState } from "react";
import {ModalMovie} from './modal.jsx'
import "./landing.css";

function Movie ({movie}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const toggleOpen = () => {
        setModalOpen(!isModalOpen)
    }
    return (
        <div>
            <li><button onClick={toggleOpen}>{movie.title}: {movie.rental_count} Rents</button></li>
            {isModalOpen && <ModalMovie setModalOpen={setModalOpen} movie={movie}/>}
        </div>
    );
};

function MovieList () {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async() => {
            try {
                const response = await fetch("/api/top5films");
                if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setMovies(result);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchMovies();
    }, []);

    return (
        <div className="page">
            <h1>Top 5 Movies:</h1>
            <ul>
                {movies.map((movie) => {
                    return <Movie key={movie.film_id} movie={movie} />
                })}
            </ul>
        </div>
    );
};

export default MovieList;