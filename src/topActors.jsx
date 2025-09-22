import { act, useEffect, useState } from "react";

function Actor ({actor}) {
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

    const details = () => {
        for (let i = 0; i < movies.length; i++) {
            console.log(movies[i]);
        }
        window.alert("Film Count: " + actor.film_count + " Check console log!");
    };

    return (
        <li><button onClick={details}>Details</button> {actor.first_name} {actor.last_name}</li>
    );
};

function ActorList () {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        const fetchActors = async() => {
            try {
                const response = await fetch("/api/top5actors");
                if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                setActors(result);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchActors();
    }, []);

    return (
        <div>
            <h1>Feature 3 & 4:</h1>
            <ul>
                {actors.map((actor) => {
                    return <Actor key={actor.actor_id} actor={actor} />
                })}
            </ul>
        </div>
    );
};

export default ActorList;