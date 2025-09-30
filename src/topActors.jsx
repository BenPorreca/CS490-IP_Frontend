import { useEffect, useState } from "react";
import {ModalActor} from './modal.jsx'
import "./landing.css";

function Actor ({actor}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const toggleOpen = () => {
        setModalOpen(!isModalOpen)
    }

    const details = () => {
        for (let i = 0; i < movies.length; i++) {
            console.log(movies[i]);
        }
        window.alert("Film Count: " + actor.film_count + " Check console log!");
    };

    return (
        <div>
            <li><button onClick={toggleOpen}>{actor.first_name} {actor.last_name}: {actor.film_count} Films</button></li>
            {isModalOpen && <ModalActor setModalOpen={setModalOpen} actor={actor}/>}
        </div>
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
        <div className="page">
            <h1>Top 5 Actors:</h1>
            <ul>
                {actors.map((actor) => {
                    return <Actor key={actor.actor_id} actor={actor} />
                })}
            </ul>
        </div>
    );
};

export default ActorList;