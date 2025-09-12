import './navigation.css';
function NavBar(){
    return(
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/films">Films</a></li>
                <li><a href="/customers">Customers</a></li>
            </ul>
        </nav>
    );
}

export default NavBar