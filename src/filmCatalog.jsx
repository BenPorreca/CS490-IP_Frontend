import { useState } from "react";

function FilmCatalog () {
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("movie");

    const movieSearch = async(e) => {
        console.log("search type: " + searchType + " and query: " + query);
        try {
            e.preventDefault();
            
            const response = await fetch(`/api/search?type=${searchType}&query=${query}`);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    };

    return(
        <form onSubmit={movieSearch}>
            <h1>Feature 5</h1>
            <input type="text" onChange={(e) => setQuery(e.target.value)}/>
            <button type="submit">Submit</button>
            <br />
            <label><b>Search By:</b></label>
            <br />
            <label>Movie:</label>
            <input type="radio" name="search" value="movie" onChange={(e) => setSearchType(e.target.value)}/>
            <br />
            <label>Actor:</label>
            <input type="radio" name="search" value="actor" onChange={(e) => setSearchType(e.target.value)}/>
            <br />
            <label>Genre:</label>
            <input type="radio" name="search" value="genre" onChange={(e) => setSearchType(e.target.value)}/>

        </form>
    );
};

export default FilmCatalog;