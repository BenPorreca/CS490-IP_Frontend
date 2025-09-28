import './navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1>SAKILA</h1>
            </div>
            <div className="navbar-right">
                <Link to="/" className="btn">Home</Link>
                <Link to="/films" className="btn">Films</Link>
                <Link to="/customers" className="btn">Customers</Link>
            </div>
        </nav>
    );
}

export default Navbar;
