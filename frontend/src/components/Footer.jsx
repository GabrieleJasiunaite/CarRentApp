import { Link } from 'react-router-dom';
import Logo from "../pictures/logo2-2.png";

const Footer = () => {
    // Footer component with links and social icons
    const currentYear = new Date().getFullYear();
    return (
        <div className="container">
            <footer>
                <img src={Logo} alt="logo" />
                <div className="footer-link-list">
                    <div className="first link-list">
                        <Link to='/aboutus'>Apie mus</Link>
                        <Link to='/faq'>D.U.K</Link>
                    </div>
                    <hr></hr>
                    <div className="second link-list">
                        <Link to='/privacypolicy'>Privatumo sąlygos</Link>
                        <Link to='/rentpolicy'>Nuomos sąlygos</Link>
                    </div>
                </div>
                <div className="social-links">
                    <a href="#"><i className="bi bi-facebook"></i></a>
                    <a href="#"><i className="bi bi-instagram"></i></a>
                    <a href="#"><i className="bi bi-twitter-x"></i></a>
                    <a href="#"><i className="bi bi-youtube"></i></a>
                </div>
            </footer>
            <p className='copyright-text'>{`Copyright ${currentYear} \u00A9 VCF Rent, Visos teisės saugomos.`}</p>
        </div>
    );
};

export default Footer;