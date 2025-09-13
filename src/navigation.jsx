import './navigation.scss';
function NavBar(){
    return(
        <nav>
            <div class="scanlines"></div>
            <ul class="intro-wrap">
                <li class="play" data-splitting>SAKILA</li>
                <li class="time">
                    <a href="/">HOME</a>
                    --
                    <a href='/films'>FILMS</a>
                    --
                    <a href='/customers'>CUSTOMERS</a>
                </li>
                <li class="recordSpeed">SLP 0:00:00</li>
            </ul>
        </nav>
    );
}

export default NavBar