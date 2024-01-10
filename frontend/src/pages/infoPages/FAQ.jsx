import { useState } from "react";
import CarRentPic4 from "../../pictures/Car-rent-pic4.png"
import { Link } from "react-router-dom";
import './infoPages.css';

// Component for displaying Frequently Asked Questions
const FAQ = () => {
    const faqData = {
        title: 'x'
    }

    const [isActive, setIsActive] = useState(false)
    return (
        <div className="container faq info-page">
            <header>
                <h1>DUK</h1>
                <img src={CarRentPic4} alt="lady at service desc" />
            </header>
            <h3>Dažniausiai užduodami klausimai</h3>
            <div className="accord-item">
                <div className="accord-title" onClick={() => setIsActive(!isActive)}>
                    <h4>KAIP REZERVUOTI <strong>VCF</strong> AUTOMOBILIUS?</h4>
                    <div className="sign">{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="accord-content">
                    <p>Programėlėje pasirinkite mygtuką Išankstinės rezervacijos, tada suveskite rezervacijos prašomus duomenis, išsirinkite patikusį automobilį, pasirinkite papildomas paslaugas ir priedus, apmokėkite banko kortele.
                        Į jūsų el. paštą bus atsiųstas automobilio rezervacijos patvirtinimo kvitas. Jums rezervuotą automobilį rasite programėlėje Mano rezervacijos.</p>
                </div>}
            </div>
            <div className="accord-item">
                <div className="accord-title" onClick={() => setIsActive(!isActive)}>
                    <h4>KAIP SURASTI REZERVUOTĄ AUTOMOBILĮ?</h4>
                    <div className="sign">{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="accord-content">
                    <p>Jums rezervuotą automobilį lengvai rasite programėlės navigacijos pagalba rezervacijos kvite nurodytoje vietoje. <strong>VCF</strong> automobiliai išsiskirs savo logotipais arba ant galinio šoninio lango pakabinta <strong>VCF</strong> vėliavėle, kurią nuomos pradžioje nuimkite ir palikite bagažinėje.</p>
                </div>}
            </div>
            <div className="accord-item">
                <div className="accord-title" onClick={() => setIsActive(!isActive)}>
                    <h4>KAIP UŽFIKSUOJAMI AUTOMOBILIO APGADINIMAI?</h4>
                    <div className="sign">{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="accord-content">
                    <p>Atsirakinę automobilį jį atidžiai apžiūrėkite Pastebėjote pažeidimus?.
                        Praneskite mums.
                        Atsidariusiame lange matysite jau užfiksuotus apgadinimus.
                        Jei pastebėjote naujus pažeidimus ir/ar defektus, įkelkite juos paspaudę mygtuką Pridėti nuotrauką.</p>
                </div>}
            </div>
            <div className="accord-item">
                <div className="accord-title" onClick={() => setIsActive(!isActive)}>
                    <h4>KĄ DARYTI, JEIGU REIKALINGA PAGALBA KELYJE?</h4>
                    <div className="sign">{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="accord-content">
                    <p>Skambinkite aptarnavimo telefonu +370 609 22222 arba atsidarius aktyvų užsakymą paspauskite viršutiniame kampe pavaizduotą telefono ženkliuką.</p>
                </div>}
            </div>
            <div className="accord-item">
                <div className="accord-title" onClick={() => setIsActive(!isActive)}>
                    <h4>KĄ DARYTI, JEIGU BAIGĖTE REZERVACIJĄ IR PAMIRŠOTE AUTOMOBILYJE SAVO DAIKTUS?</h4>
                    <div className="sign">{isActive ? '-' : '+'}</div>
                </div>
                {isActive && <div className="accord-content">
                    <p>Skambinkite aptarnavimo telefonu +370 609 22222.</p>
                </div>}
            </div>
            <Link to="/">Grįžti į pagrindinį</Link>
        </div>
    );
};

export default FAQ;
