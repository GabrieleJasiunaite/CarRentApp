import CarRentPic4 from "../../pictures/Car-rent-pic4.png"
import { Link } from "react-router-dom";
import Accordion from "../../helpers/Accordion";
import { faqData } from "../../helpers/content";
import './infoPages.css';

// Component for displaying Frequently Asked Questions
const FAQ = () => {
    return (
        <div className="container faq info-page">
            <header>
                <h1>DUK</h1>
                <img src={CarRentPic4} alt="lady at service desc" />
            </header>
            <h3>Dažniausiai užduodami klausimai</h3>
            <div className="accordion">
                {faqData.map(({ title, content }, index) => (
                    <Accordion key={index} title={title} content={content} />
                ))}
            </div>
            <Link to="/">Grįžti į pagrindinį</Link>
        </div>
    );
};

export default FAQ;
