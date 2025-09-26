import { useEffect, useState } from "react";
import {ModalActor} from './modal.jsx'

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
            <li><button onClick={toggleOpen}>Details</button> {actor.first_name} {actor.last_name}</li>
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