import { useEffect, useState } from "react";

function Movie ({name}) {
    return (
        <li>{name}</li>
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
            <h1>Feature 1:</h1>
            <ul>
                {movies.map((movie) => {
                    return <Movie key={movie.film_id} name={movie.title}> </Movie>
                })}
            </ul>
        </div>
    );
};

export default MovieList;