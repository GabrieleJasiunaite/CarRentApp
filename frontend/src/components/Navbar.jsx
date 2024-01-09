import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Logo from "../pictures/logo2-2.png";
import { useState } from "react";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = (e) => {
        logout();
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="container">
            <div className="navbar">
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
                                        <Link to='/new'>Pridėti automobilį</Link>
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
                        </button>
                        <div className={`myLinks ${showMenu ? 'showMenu' : ''}`}>
                            <Link to="/aboutus">Apie mus</Link>
                            <Link to="/privacypolicy">Privatumo politika</Link>
                            <Link to="/rentpolicy">Nuomos sąlygos</Link>
                            <Link to="/faq">DUK</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;