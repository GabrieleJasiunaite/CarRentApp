import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import Logo from "../../pictures/logo2-2.png";
import { useState } from "react";
import './navbar.css';

// Navbar component with links and user-specific actions
const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [showMenu, setShowMenu] = useState(false);

    // Handles the click event and initiates the logout process
    const handleClick = (e) => {
        logout();
    }

    // Toggles display of the menu by flipping the showMenu state
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    //Closes menu by setting showMenu state to false
    const closeMenu = () => {
        setShowMenu(false);
    }

    return (

        <div className={!user ? "navbar" : user.isAdmin ? "navbar admin" : "navbar"}>
            <div className="container">
                {user && (
                    <Link to='/'>
                        <h2>{user.email}</h2>
                    </Link>
                )}
                {!user && (
                    <Link to='/'>
                        <img src={Logo} alt="logo" className="page-logo" />
                    </Link>
                )}
                <nav>
                    <div className="nav-links">
                        {user &&
                            <>
                                {!user.isAdmin && (
                                    <>
                                        <Link to='/reservations'>Mano rezervacijos</Link>
                                        <button className="logout-btn" onClick={handleClick}>Log out</button>
                                    </>
                                )}
                                {user.isAdmin && (
                                    <>
                                        <Link to='/reservations'>Visos rezervacijos</Link>
                                        <Link to='/new' className="add-auto">Pridėti automobilį</Link>
                                        <button className="logout-btn" onClick={handleClick}>Log out</button>
                                    </>
                                )}
                            </>
                        }
                        {!user && (
                            <>
                                <Link to='/login'>Prisijungti</Link>
                                <Link to='/signup'>Registruotis</Link>
                            </>

                        )}
                        <button className={`icon ${showMenu ? 'showMenu' : ''}`} onClick={toggleMenu}>
                            <span className="iconify" data-icon="ph:list-bold"></span>
                            <div className={`myLinks ${showMenu ? 'showMenu' : ''}`}>
                                <Link to="/aboutus" onClick={closeMenu}>Apie mus</Link>
                                <Link to="/privacypolicy" onClick={closeMenu}>Privatumo politika</Link>
                                <Link to="/rentpolicy" onClick={closeMenu}>Nuomos sąlygos</Link>
                                <Link to="/faq" onClick={closeMenu}>DUK</Link>
                            </div>
                        </button>
                    </div>
                </nav>
            </div>
        </div>

    );
};

export default Navbar;