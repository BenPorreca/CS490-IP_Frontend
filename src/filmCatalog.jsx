import { useState } from "react";
import Pagination from "./pagination";
import { ModalMovie } from "./modal";
import "./filmCatalog.css";


function FilmCatalog () {
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("movie");
    const [results, setResults] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const movieSearch = async(e) => {
        e.preventDefault();
        if (!query.trim()) {
            return;
        }
        console.log("search type: " + searchType + " and query: " + query);
        try {
            e.preventDefault();
            const response = await fetch(`/api/search?type=${searchType}&query=${query}`);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setResults(result);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    return(
        <div className="catalog">
            <form onSubmit={movieSearch}>
                <h1>Feature 5</h1>
                <input type="text" 
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter your search..."
                />
                <select value={searchType} onChange={(e) => { setSearchType(e.target.value); setResults([]); }}>
                    <option value="movie">Movie</option>
                    <option value="actor">Actor</option>
                    <option value="genre">Genre</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            {results.length > 0 && (
                <>
                    {searchType === "movie" && (
                        <Pagination
                            name="Movies by Name"
                            data={results}
                            headers={["Title", "Description"]}
                            renderRow={(item) => (
                                <tr key={item.film_id}>
                                    <td>
                                        <button className="link-button" onClick={() => handleMovieClick(item)}>
                                            {item.title}
                                        </button>
                                    </td>
                                    <td>{item.description}</td>
                                </tr>
                            )}
                        />
                    )}

                    {searchType === "genre" && (
                        <Pagination
                            name="Movies by Genre"
                            data={results}
                            headers={["Title", "Genre"]}
                            renderRow={(item) => (
                                <tr key={item.film_id}>
                                    <td>
                                        <button className="link-button" onClick={() => handleMovieClick(item)}>
                                            {item.title}
                                        </button>
                                    </td>
                                    <td>{item.name}</td>
                                </tr>
                            )}
                        />
                    )}

                    {searchType === "actor" && (
                        <Pagination
                            name="Movies by Actor"
                            data={results}
                            headers={["Title", "Actor"]}
                            renderRow={(item) => (
                                <tr key={item.film_id}>
                                    <td>
                                        <button className="link-button" onClick={() => handleMovieClick(item)}>
                                            {item.title}
                                        </button>
                                    </td>
                                    <td>{item.first_name} {item.last_name}</td>
                                </tr>
                            )}
                        />
                    )}
                </>
            )}
            {results.length === 0 && (
                <>
                    <br />
                    <br />
                    <br />
                    <h1>No Results</h1>
                </>
            )}

            {modalOpen && selectedMovie && (
                <ModalMovie setModalOpen={setModalOpen} movie={selectedMovie} />
            )}

        </div>        
    );
};

export default FilmCatalog;