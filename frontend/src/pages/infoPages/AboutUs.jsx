import { useState } from "react";
import CarRentPic3 from "../../pictures/Car-rent-pic3.png"
import { Link } from "react-router-dom";
import './infoPages.css';

// Component providing information about the company and contact form
const AboutUs = () => {
    // State to manage email and message input fields
    const [email, setEmail] = useState()
    const [message, setMessage] = useState()
    // Handler for submitting queries
    const handleQuerySubmit = (e) => {
        e.preventDefault()
        setEmail("")
        setMessage("")
    }

    return (
        <>
            <div className="container about-us info-page">
                <header>
                    <div>
                        <h1>VCF</h1>
                        <h2>Automobilių nuoma</h2>
                    </div>
                    <img src={CarRentPic3} alt="people and rented car" />
                </header>
                <p className="top-text"><strong>UAB "VCF-automobilių nuoma"</strong> - per ilgą penkiolikos parų laikotarpį didelę patirtį sukaupusi įmonė, savo klientams siūlanti pačių įvairiausių kategorijų ir modelių automobilių nuomą.</p>
                <p>Savo klientams mes norime pasiūlyti tik pačius saugiausius, patogiausius bei naujus automobilius už Jums palankiausią kainą. Daugiau nei 15 transporto priemonių iš viso turinti mūsų įmonė leidžia savo klientams rinktis.</p>
                <h3>Siūlomi mašinų nuomos tipai:</h3>
                <ul>
                    <li>Trumpalaikė mašinos nuoma (pasirinkę trumpalaikę mašinos nuomą, klientai turės galimybę ja važinėtis nuo vienos dienos iki 2 mėnesių laikotarpiu);</li>
                    <li>Ilgalaikė transporto nuoma (sklandžiam Jūsų veiklos užtikrinimui bei plėtrai mes pasiruošę išnuomoti bet kurį automobilį iš didelio sąrašo skirtingų charakteristikų auto priemonių);</li>
                </ul>
                <p>UAB „VCF“ veikla siekiame patenkinti žmonių keliavimo poreikį ir nenutrūkstantį mobilumą, dėl to įrengėme ne vieną automobilių nuomos punktą. Mus galite rasti pačiame Vilniaus senamiestyje, viename iš sostinės rajonų — Naujamiestyje, Savanorių prospekte, Klaipėdoje, taip pat Vilniaus, Kauno bei Palangos oro uostuose. Suprasdami vartotojų poreikius, prisitaikėme prie klientų norų ir sukūrėme lanksčią auto nuomos sistemą, kuri leidžia kiekvienam lengvai pasinaudoti įvairaus transporto nuoma.</p>
                <p>Išklausydami savo klientų pageidavimus, stengiamės pasiūlyti geriausią turimą variantą ir būti mėgstamiausia transporto nuomos kompanija.</p>
                <h3>Susisiekite su mumis</h3>
                <ul className="contacts-data">
                    <li>Vilniaus centrinis biuras</li>
                    <li>Arklių g.25, Vilnius</li>
                    <li>Tel. +370 5 212 7766</li>
                    <li>Mob. tel.: +370 652 12766</li>
                </ul>
                <h3>Arba parašykite mums</h3>
                <form onSubmit={handleQuerySubmit}>
                    <input type="email" placeholder="Jūsų el. pašto adresas" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <textarea name="" id="" cols="30" rows="10" placeholder="Ko norėtumėte paklausti..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button>Siųsti</button>
                </form>
                <Link to="/">Grįžti į pagrindinį</Link>
            </div>
        </>
    );
};

export default AboutUs;