import { useEffect, useState } from "react";

function Movie ({movie}) {
    const details = () => {
        window.alert("Name: " + movie.name + " ID: " + movie.film_id + " Rentals: " + movie.rental_count);
    };
    return (
        <li><button onClick={details}>Details</button> {movie.title}</li>
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
        <div>
            <h1>Feature 1 & 2:</h1>
            <ul>
                {movies.map((movie) => {
                    return <Movie key={movie.film_id} movie={movie} />
                })}
            </ul>
        </div>
    );
};

export default MovieList;