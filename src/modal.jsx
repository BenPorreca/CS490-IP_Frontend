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
    const [selectedMovie, setSelectedMovie] = useState(null);

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
                    {movies.map((movie) => (
                        <button key={movie.film_id} onClick={() => setSelectedMovie(movie)}>{movie.title}: {movie.rental_count}</button>
                    ))}

                    {selectedMovie && (
                        <ModalMovie
                            setModalOpen={() => setSelectedMovie(null)}
                            movie={selectedMovie}
                        />
                    )}

                </div>
                <div className='footer'>
                    <button onClick={() => setModalOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};

export function ModalCustomer({ setModalOpen, customer, rentals }) {
    const [rentalHistory, setRentalHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h2>
                        {customer.first_name} {customer.last_name}
                    </h2>
                </div>

                <div className="body">
                    <h3>Customer Information</h3>
                    <p><strong>Customer ID:</strong> {customer.customer_id}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Active:</strong> {customer.active ? "Yes" : "No"}</p>
                    <p><strong>Address:</strong> {customer.address}</p>
                    <p><strong>District:</strong> {customer.district}</p>
                    <p><strong>City:</strong> {customer.city}</p>
                    <p><strong>Country:</strong> {customer.country}</p>
                    <p><strong>Postal Code:</strong> {customer.postal_code}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                    <p><strong>Created:</strong> {customer.create_date}</p>
                    <p><strong>Last Update:</strong> {customer.last_update}</p>

                    <h3>Rental History</h3>
                    {(!rentals || rentals.length === 0) ? (
                        <p>No rental history found.</p>
                    ) : (
                        <table className="rental-table">
                            <thead>
                                <tr>
                                    <th>Rental ID</th>
                                    <th>Film Name</th>
                                    <th>Rental Date</th>
                                    <th>Return Date</th>
                                    <th>Last Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rentals.map((rental) => (
                                    <tr key={rental.rental_id}>
                                        <td>{rental.rental_id}</td>
                                        <td>{rental.film_name}</td>
                                        <td>{new Date(rental.rental_date).toLocaleString()}</td>
                                        <td>{rental.return_date ? new Date(rental.return_date).toLocaleString() : "Not returned"}</td>
                                        <td>{new Date(rental.last_update).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="footer">
                    <button onClick={() => setModalOpen(false)}>Close</button>
                </div>
            </div>
        </div>
    );
};