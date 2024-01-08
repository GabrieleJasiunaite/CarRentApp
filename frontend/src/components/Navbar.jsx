import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleClick = (e) => {
        logout();
    };

    return (
        <div className="navbar">
            <div className="container">
                {user && (
                    <Link to='/'>
                        <h2>{user.email}</h2>
                    </Link>
                )}
                {!user && (
                    <Link to='/'>
                        <h1>VCF Rent</h1>
                    </Link>
                )}
                <nav>
                    {user &&
                        <>
                            {!user.isAdmin && (
                                <div className="nav-links">
                                    <Link to='/reservations'>Mano rezervacijos</Link>
                                    <button className="logout-btn" onClick={handleClick}>Log out</button>
                                </div>
                            )}
                            {user.isAdmin && (
                                <div className="nav-links">
                                    <Link to='/reservations'>Visos rezervacijos</Link>
                                    <button className="logout-btn" onClick={handleClick}>Log out</button>
                                </div>
                            )}
                        </>
                    }
                    {!user && (
                        <div className="nav-links">
                            <Link to='/login'>Prisijungti</Link>
                            <Link to='/signup'>Registruotis</Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Navbar;