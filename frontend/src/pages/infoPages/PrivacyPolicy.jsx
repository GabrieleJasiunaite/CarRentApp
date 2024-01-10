import { Link } from "react-router-dom";
import CarRentPic5 from "../../pictures/Car-rent-pic5.png";
import './infoPages.css';

// PrivacyPolicy component for displaying privacy policy information
const PrivacyPolicy = () => {
    return (
        <div className="container privacy-policy info-page">
            <header>
                <h1>Privatumo politika</h1>
                <img src={CarRentPic5} alt="car with lock" />
            </header>
            <p className="top-text">Šioje <strong>VCF</strong> privatumo politikoje aprašoma, kokią informaciją renkame ir kaip ją naudojame.</p>

            <h3>Kokią informaciją mes renkame?</h3>
            <p>Mes galime rinkti, saugoti ir naudoti žemiau nurodytų rūšių informaciją:</p>
            <ul>
                <li> informaciją apie Jūsų kompiuterį ir apie Jūsų apsilankymus šioje interneto svetainėje bei naudojimąsi šia interneto svetaine (įskaitant Jūsų IP adresą, geografinę vietą, naršyklės tipą, iš kur buvote nukreiptas, lankymosi trukmę ir puslapių žiūrėjimų skaičių);</li>
                <li> informaciją, kurią Jūs suteikiate mums tikslu prenumeruoti mūsų interneto svetainės paslaugas, pranešimus el.paštu ir/arba naujienlaiškius;</li>
                <li>bet kokią kitą informaciją, kurią Jūs savo pasirinkimu siunčiate mums.</li>
            </ul>
            <p></p>
            <h3>Slapukai</h3>
            <p>Slapuką sudaro informacija, tinklo tarnybinės stoties siunčiama interneto naršyklei ir laikoma naršyklės. Ši informacija vėliau siunčiama atgal tarnybinei stočiai kaskart kai naršyklė paprašo puslapio iš tos tarnybinės stoties. Tai leidžia tai tinklo tarnybinei stočiai identifikuoti ir sekti interneto naršyklę. Mes naudojame Google Analytics naudojimuisi šia interneto svetaine analizuoti. Google Analytics generuoja statistinę ir kitą informaciją apie naudojimąsi svetaine panaudodama slapukus, kurie laikomi vartotojų kompiuteriuose. Generuojama su mūsų interneto svetaine susijusi informacija yra naudojama kurti ataskaitas apie naudojimąsi šia interneto svetaine. Šią informaciją laikys Google. Google privatumo politika prieinama čia: http://www.google.com/privacypolicy.html . Pas mus besireklamuojantieji arba mokėjimo paslaugų teikėjai irgi gali siųsti Jums slapukus. Savo interneto svetainėje mes skelbiame Google Adsense interesais paremtas reklamas. Jas taip, kad atspindėtų Jūsų interesus, parenka Google. Kad nustatytų Jūsų interesus, Google seks Jūsų elgesį internete naudodama slapukus. Jūs galite peržiūrėti, ištrinti ir pridėti interesų kategorijas, susietas su Jūsų naršykle, naudodami Google bendrovės Ads Preference Manager, kurį galima rasti adresu http://www.google.com/ads/preferences/. Jūs galite atsisakyti Adsense partnerių tinklo slapuko adresu http://www.google.com/privacy_ads.html . Tačiau šiame atsisakymo mechanizme naudojamas slapukas, ir jeigu Jūs ištrinsite slapukus iš savo kompiuterio, tai Jūsų atsisakymas nebus išsaugotas. Kad užsitikrintumėte, jog atsisakymas būtų išsaugotas konkrečiai naršyklei, turėtumėte naudoti Google naršyklės įskiepį, kurį galima rasti adresu http://www.google.com/ads/preferences/plugin . Dauguma naršyklių leidžia Jums nepriimti jokių slapukų, nors tam tikros naršyklės leidžia Jums nepriimti tik trečiųjų šalių slapukų. Pavyzdžiui, Internet Explorer naršyklėje galite atsisakyti visų slapukų spausdami „Tools“ {'>'} „Internet Options“ {'>'} „Privacy“ ir pasirinkdami „Block all cookies“ (tai daroma paslenkant perjungiklį). Tačiau visų slapukų blokavimas turės neigiamą įtaką galimybei naudotis daugeliu interneto svetainių, įskaitant šią.</p>
            <h3>Jūsų asmeninių duomenų naudojimas</h3>
            <p>Asmeniniai duomenys, pateikti šioje interneto svetainėje, bus naudojami tikslams, nurodytiems šioje privatumo politikoje arba aktualiose šios interneto svetainės dalyse. Mes galime naudoti jūsų asmeninę informaciją šiems tikslams:</p>
            <ul>
                <li>Interneto svetainei administruoti;</li>
                <li>Jūsų naršymo patirčiai gerinti, pritaikydami šią interneto svetainę asmeniniams poreikiams;</li>
                <li>turint Jūsų sutikimą siųsti Jums el. paštu mūsų naujienlaiškį, kuris, mūsų manymu, gali būti Jums įdomus (Jūs galite bet kada informuoti mus, jeigu nebenorite, kad naujienlaiškis būtų Jums siunčiamas);</li>
                <li> trečiosioms šalims suteikti statistinę informaciją apie mūsų vartotojus, tačiau ši informacija nebus naudojama jokiam atskiram vartotojui identifikuoti</li>
            </ul>
            <p>Be aiškaus jūsų sutikimo mes neteiksime jūsų asmeninių duomenų jokioms trečiosioms šalims tiesioginės rinkodaros tikslais</p>
            <h3>Politikos pakeitimai</h3>
            <p>Mes galime retkarčiais atnaujinti šią privatumo politiką paskelbdami naują versiją savo interneto svetainėje. Kartkartėmis Jūs turėtumėte peržiūrėti šį puslapį, kad įsitikintumėte, jog esate patenkintas bet kokiais pasikeitimais.</p>
            <h3>Trečiųjų šalių interneto svetainės</h3>
            <p>Šioje interneto svetainėje yra nuorodų į kitas interneto svetaines. Mes nesame atsakingi už trečiųjų šalių interneto svetainių privatumo politikas ar praktikas</p>

            <Link to="/">Grįžti į pagrindinį</Link>
        </div>
    );
};

export default PrivacyPolicy;