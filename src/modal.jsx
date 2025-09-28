import './modal.css';
import { useState, useEffect } from 'react';

export function ModalMovie ({setModalOpen, movie}) {
    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='title'>
                    <h2>{movie.title}</h2>
                </div>
                <div className='body'>
                    <p>Descritpion: {movie.description}</p>
                    <p>Genre: {movie.name}</p>
                    <p>Release Year: {movie.release_year}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Length: {movie.length} minutes</p>
                </div>
                <div className='footer'>
                    <button onClick={() => setModalOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export function ModalActor ({setModalOpen, actor}) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchActorMovies = async() => {
            try {
                const response = await fetch("/api/actorInfo/" + actor.actor_id);
                if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setMovies(result);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchActorMovies();
    }, []);

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='title'>
                    <h2>{actor.first_name} {actor.last_name}</h2>
                </div>
                <div className='body'>
                    <h3>Top Movies</h3>
                    {movies.map((movie) => {
                        return <p>{movie.title}: {movie.rental_count} rents</p>
                    })}
                </div>
                <div className='footer'>
                    <button onClick={() => setModalOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};