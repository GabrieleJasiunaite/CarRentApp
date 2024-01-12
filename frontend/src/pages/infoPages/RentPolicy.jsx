import { Link } from 'react-router-dom';
import CarRentPic6 from "../../pictures/Car-rent-pic6.png";
import './infoPages.css';

// RentPolicty component for displaying rent policy information
const RentPolicy = () => {
    return (
        <div className="conditions container info-page">
            <header>
                <h1>Nuomos sąlygos</h1>
                <img src={CarRentPic6} alt="people driving car" />
            </header>
            <div className="car-reservation">
                <h2>Automobilio rezervacija</h2>
                <p>Visus nuomojamus automobilius galite rezervuoti www.renteuropa.lt svetainėje pasirenkant automobilį ir užpildant rezervacijos laukus, elektroniniu paštu  <strong>info@rfcrent.lt</strong> arba telefonu <strong>+370 670 69699</strong></p>
                <p>Rezervacija galutinai patvirtinama tik gavus Rent Europa nuomos punkto patvirtinimą elektroniniu paštu arba susisiekus telefonu.
                    Rezervacijos patvirtinimui išankstiniai mokesčiai neimami, todėl rezervacijos atšaukimas nekainuoja.
                    Susiklosčius aplinkybėms, dėl kurių būtų neįmanoma suteikti paslaugų rezervacijos patvirtinime mes įsipareigojame nedelsiant apie tai informuoti klientą ir pasiūlyti tos pačios arba dar aukštesnės klasės automobilį už Jūsų rezervuoto automobilio kainą.</p>
            </div>
            <div className="age">
                <h2>Reikalavimai dėl amžiaus</h2>
                <p>Minimalus nuomininko ir vairuotojo amžius turi būti 21 metai. Nuomininkas privalo turėti galiojantį vairuotojo pažymėjimą, ir nemažesnę nei 2 metų vairavimo patirtį. Jeigu vairuotojo amžius mažesnis nei 21 metai arba mažesnis nei 2 metų vairavimo stažas, tuomet gali pasikesti nuomos sąlygos.</p>
            </div>
            <div className="documents-needed">
                <h2>Reikalingi dokumentai</h2>
                <ul>
                    <li>Galiojantis vairuotojo pažymėjimas.</li>
                    <li>Galiojantis pasas arba asmens tapatybės kortelė iki nuomos termino pabaigos.</li>
                </ul>
                <p>Visi dokumentai turi būti išduoti nuomininko vardu</p>
            </div>
            <div className="payment">
                <h2>Atsiskaitymas</h2>
                <p>Apskaičiuotas nuomos mokestis sumokamas nuomos laikotarpio pradžioje, iškart prieš pasiimant automobilį. Už automobilio nuomą galima atsiskaityti grynais pinigais arba banko kortelėmis <strong>VISA, VISA ELECTRON, MASTERCARD, MAESTRO (apie atsiskaityma kortele reikia perspėti iš anksto). </strong></p>
            </div>
            <div className="deposit">
                <h2>Užstatas</h2>
                <p>Nuo 300 EUR iki 500 EUR užstatas yra nuomininko atsakomybei lygi suma vagystės, autoavarijos ar trečiujų asmenų veiklos atvejais. Šią sumą klientas palieka nuomos pradžioje grynais pinigais arba banko kortelės sąskaitoje užšaldome (rezervuojame) tuo atveju, jei automobilis būtų sugrąžintas prastos būklės. Užstatas grąžinamas po nuomos pabaigos, klientui grąžinus tvarkingą ir pilnu kuro baku automobilį.
                    Atsiskaitant už automobilio nuomą kreditine kortele (VISA) užstatas nėra privalomas (netaikoma nuomojantis prestižinės klasės automobilį).</p>
                <p>PASTABA: užstatas gali būti užsaldytas (rezervuotas) tik su <strong>kreditine (VISA, MASTERCARD)</strong> kortele.</p>
            </div>
            <div className="insurance">
                <h2>Draudimas</h2>
                <p>Visi automobiliai yra apdrausti pagal transporto priemonių draudimo taisykles, galiojančias Lietuvos Respublikoje. Draudimą sudaro: automobilio draudimas avarijos atveju, bei civilinės atsakomybės draudimas. Draudimo kaštai yra įskaičiuoti į nuomos kainą.
                    Išnuomoto automobilio sugadinimo ar vagystės atveju, nuomininko atsakomybė yra nuo 400 €.</p>
                <p>Nuomininkas gali įsigyti papildomą „ekstrą draudimą”, kuris sumažina atsakomybę. Atsakomybės sumažinimo mokesčio suma priklauso nuo automobilio klasės ir nuomos termino (įkainius galite sužinoti užpildę rezervacijos formą arba terautis el. laišku arba telefonu). Atsakomybės sumažinimo mokestis negalioja tokios žalos atveju: kai yra sugadinamas automobilio interjeras, kai sugadinamos padangos. Ekstra draudimas galioja vienam eismo įvykiui ir tik pateikus teisingai užpildytą eismo įvykio deklaraciją ar policijos pažymą apie auto įvykį ir išsamų Nuomininko paaiškinimą. Pasirinkus papildomo draudimo paslaugą, už automobilį kliento paliekamo užstato suma būna sumažinta iki 50 EUR (priklausomai nuo automobilio klasės).</p>
            </div>
            <div className="return">
                <h2>Automobilio pristatymas/grąžinimas</h2>
                <p>Išsinuomotą automobilį pasiimant ar grąžinant į „Rent Europa” biuruose Vilniuje ar Kaune nereikalaujamas joks mokestis. Klientams siūlome už papildomą mokestį pristatyti ir nuomai pasibaigus paimti automobilius Vilniaus, Kauno ar Palangos oro uostose bei bet kuriame mieste bet kuriuo paros metu.</p>
            </div>
            <div className="cost">
                <h2>Kaina</h2>
                <p>Automobilių nuomos kainos lentelėje yra nurodytos tik tuo atveju, jei nuomojant automobilį keliaujama Lietuvoja. Kelionėms už šių šalių ribų nuomos kaina gali didėti. Į lentelėje nurodytas nuomos kainas yra įskaičiuota: civilinis draudimas, KASKO draudimas, papildomas vairuotojas bei 24/7 pagalba kelyje. Svetainėje nurodytos lengvųjų automobilių nuomos kainos yra su PVM.</p>
            </div>
            <div className="tech-help">
                <h2>Automobilio gedimai (techninė pagalba)</h2>
                <p>Visiems automobiliams teikiama techninės pagalbos kelyje paslauga visoje Lietuvoje 24/7.</p>
            </div>
            <div className="rent-time">
                <h2>Nuomos laikotarpis</h2>
                <p>Minimalus nuomos laikas yra 24 valandos (viena para). Nuomos laikas pradedamas skaičiuoti nuo automobilio paėmimo momento. Jeigu automobilį vėluojama grąžinti daugiau kaip 2 valandas, skaičiuojama nuoma už dar vieną parą.</p>
            </div>
            <div className="replacementcar">
                <h2>Pakaitinis automoblis</h2>
                <p>Jeigu nuomos metu įvyksta techninis gedimas, avarija arba jei išnuomotas automobilis tampa nebetinkamas naudoti dėl kitų priežasčių, savo klientams suteikiame pakaitinį automobilį.</p>
            </div>
            <div className="extra">
                <h2>Papildoma įranga</h2>
                <p>Kartu su automobiliu galime pasiūlyti išsinuomoti navigacines GPS sistemas, bei nemokamai pasiūlysime įvairių dydžių kėdutes vaikams.</p>
            </div>
            <div className="fuel">
                <h2>Kuras</h2>
                <p>Automobilių nuomos kainos lentelėje yra nurodytos tik tuo atveju, jei nuomojant automobilį keliaujama Lietuvoja. Kelionėms už šių šalių ribų nuomos kaina gali didėti. Į lentelėje nurodytas nuomos kainas yra įskaičiuota: civilinis draudimas, KASKO draudimas, papildomas vairuotojas bei 24/7 pagalba kelyje. Svetainėje nurodytos lengvųjų automobilių nuomos kainos yra su PVM.</p>
            </div>
            <div className="responsibility">
                <h2>Nuomininko atsakomybė</h2>
                <p>Nuomininkas yra atsakingas už visus nuostolius, patirtus automobilio nuomos laikotarpiu. Nuostoliai apima (bet neapsiriboja) kito automobilio apgadinimą, automobilio vertės praradimą vagystės atveju, automobilio vertės sumažėjimą (neįskaitant naturalaus nusidėvėjimo), transportavimą, baudas už kelių eismo taisyklių pažeidimus. Nuomininkas yra atsakingas iki momento, kai Rent Europa personalas patvirtina, kad automobilis grąžintas be nuostolių. Jei automobilis grąžinamas prieš ar po darbo valandų ar nenumatytoje vietoje, nuomininkas yra atsakingas už automobilį iki momento, kol Rent Europa įvertina, ar automobilis grąžintas be pažeidimų ir nuostolių ir patvirtina tai nuomininkui.</p>
            </div>
            <div className="driver">
                <h2>Vairuotojo paslauga</h2>
                <p>Nuomojamus automobilius galite išsinuomoti su vairuotojo paslauga. Mūsų vairuotojai kalba lietuvių, anglų ir rusų kalbomis. Vairuotojai klientą gali pasitikti oro uoste ir nuvežti į nurodytą Lietuvos vietą ar už jos ribų.</p>
            </div>
            <Link to="/">
                Grįžti į pagrindinį
            </Link>
        </div>
    );
};

export default RentPolicy;