import { useEffect, useState } from "react"
// pictures import
import CarRentPic from "../pictures/Car-rent-pic.png"
import CarRentPic2 from "../pictures/Car-rent-pic2.png"
import audi from "../pictures/audi.png"
import bmw from "../pictures/bmw.png"
import ford from "../pictures/ford.png"
import mazda from "../pictures/mazda.png"
import mercedes from "../pictures/mercedes.png"
import nissan from "../pictures/nissan.png"
import toyota from "../pictures/toyota.png"
import vw from "../pictures/vw.png"


// Home component containing sections like featured cars, registration steps, and brand logos
const Home = () => {
    const [carsData, setCarsData] = useState([])
    const [showModal, setShowModal] = useState(false);

   //Fetches a random set of cars from the API
    useEffect(() => {
        const fetchRandomCars = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/cars');
                if (response.ok) {
                    const data = await response.json()
                    const randomCars = data.sort(() => Math.random() - 0.5).slice(0, 4);
                    setCarsData(randomCars);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            };
        };

        fetchRandomCars();
    }, [])

    //Sets a timer to display the modal after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowModal(true);
        }, 3000)
    
        return () => clearTimeout(timer)
    }, [])
    
    //Closes modal window after button is clicked
    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <>
            <div className="first-container">
                <div className="first-container-text">
                    <h1><strong>Netikėtai prireikė išsinuomoti automobilį? <br />
                        Čia jį rasite už <span>ypač mažą kainą.</span></strong></h1>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. </p>
                </div>
                <img src={CarRentPic} alt="car-rent-logo" />
            </div>
            <div className="second-container">
                <h2>Populiariausi automobiliai</h2>
                <div className="cars-display-container">
                    {carsData.map(car => (
                        <div className="car-display-container" key={car._id}>
                            <div className="car-pic-box">
                                <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                                <h3>{car.brand} {car.model}, {car.year}</h3>
                            </div>
                            <div className="car-info-box">
                                <p><span className="iconify" data-icon="f7:car-fill"></span> {car.body}</p>
                                <p><span className="iconify" data-icon="game-icons:car-seat"></span> {car.seats} vietų</p>
                                <p><span className="iconify" data-icon="bi:fuel-pump"></span>{car.fuelType} </p>
                                <p><span className="iconify" data-icon="game-icons:gear-stick-pattern"></span> {car.transmission}</p>
                            </div>
                            <div className="car-button-box">
                                <p>{car.price} Eur <span>/parai</span></p>
                                <button>Daugiau <i className="bi bi-arrow-right"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="third-container">
                <img src={CarRentPic2} className="third-pic" alt="car pick" />
                <div className="num1 block">
                    <img src="../images/1.png" alt="number 1" />
                    <h3>Prisiregistruokite</h3>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
                <div className="num2 block">
                    <img src="../images/2.png" alt="number 2" />
                    <h3>Pasirinkite automobilį</h3>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
                <div className="num3 block">
                    <img src="../images/3.png" alt="number 3" />
                    <h3>Pasirinkite nuomos datą</h3>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
                <div className="num4 block">
                    <img src="../images/4.png" alt="number 4" />
                    <h3>Patvirtinkite savo užsakymą</h3>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
                <div className="num5 block">
                    <img src="../images/5.png" alt="number 5" />
                    <h3>Laukite patvirtinimo</h3>
                    <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>
            </div>

            <div className="fourth-container">
                <img src={audi} alt="audi" />
                <img src={bmw} alt="bmw" />
                <img src={ford} alt="ford" />
                <img src={mazda} alt="mazda" />
                <img src={mercedes} alt="mercedes" />
                <img src={nissan} alt="nissan" />
                <img src={toyota} alt="toyota" />
                <img src={vw} alt="vw" />
            </div>
            <div className={`cookie-modal ${showModal ? "show" : ""}`}>
                <div className="cookie-content">
                    <h2>Slapukų politika</h2>
                    <p>Mes naudojame slapukus, kad pagerintume jūsų naršymo patirtį.{' '}
                        <a href="/privacypolicy">Plačiau apie slapukus</a>.
                    </p>
                <div className="cookie-buttons">
                    <button onClick={handleClose}>Sutinku</button>
                    <button onClick={handleClose}>Nesutinku</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default Home;