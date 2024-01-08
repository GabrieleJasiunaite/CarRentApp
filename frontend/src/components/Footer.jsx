import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="container">
            <Link to='/aboutus'>Apie mus</Link>
            <Link to='/faq'>D.U.K</Link>
            <Link to='/privacypolicy'>Privatumo sąlygos</Link>
            <Link to='/rentpolicy'>Nuomos sąlygos</Link>
        </div>
    );
};

export default Footer;