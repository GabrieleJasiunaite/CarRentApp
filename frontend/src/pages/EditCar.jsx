import { useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Pasiima params iš Link CarDetails puslapyje
    const location = useLocation();
    const car = location.state;

    const [imageUrl, setimageUrl] = useState(car.imageUrl);
    const [model, setModel] = useState(car.model);
    const [brand, setBrand] = useState(car.brand);
    const [price, setPrice] = useState(car.price);
    const [year, setYear] = useState(car.year);
    const [fuelType, setFuelType] = useState(car.fuelType);
    const [transmission, setTransmission] = useState(car.transmission);
    const [seats, setSeats] = useState(car.seats);
    const [body, setBody] = useState(car.body);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (imageUrl === "" | model === "" | brand === "" | !price | !year | fuelType === "" | transmission === "" | !seats | body === "") {
            setError("Užpildykite visus laukus");
            return;
        };

        const response = await fetch(`/api/cars/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ imageUrl, model, brand, price, year, fuelType, transmission, seats, body }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 500) {
            setError('Can not connect to server');
            return;
        };

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        };

        if (response.ok) {
            setError(null);
            return navigate(`/cars/${id}`)
        };
    };

    return (
        <div className="container">
            <Navbar />
            <div className="edit-car">
                <form onSubmit={handleSubmit} className={error ? "form-error" : ""}>
                    <label htmlFor="imgUrl">Paveikslėlio nuoroda: </label>
                    <input type="text" id="imgUrl" value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} />
                    <label htmlFor="model">Markė: </label>
                    <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
                    <label htmlFor="brand">Modelis: </label>
                    <input type="text" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <label htmlFor="price">Nuomos kaina (dienos): </label>
                    <input type="number" id="price" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
                    <label htmlFor="year">Metai: </label>
                    <input type="number" id="year" min={2000} value={year} onChange={(e) => setYear(e.target.value)} />
                    <label htmlFor="fuelType">Kuro tipas: </label>
                    <input type="text" id="fuelType" value={fuelType} onChange={(e) => setFuelType(e.target.value)} />
                    <label htmlFor="transmission">Pavarų dėžė: </label>
                    <input type="text" id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} />
                    <label htmlFor="seats">Vietos: </label>
                    <input type="number" id="seats" min={2} value={seats} onChange={(e) => setSeats(e.target.value)} />
                    <label htmlFor="body">Kėbulo tipas: </label>
                    <input type="text" id="body" value={body} onChange={(e) => setBody(e.target.value)} />
                    <button>Redaguoti</button>
                    {error && <div className="error">{error}</div>}
                </form>
                <Link to={`/cars/${id}`}>Grįžti atgal</Link>
            </div>
            <Footer />
        </div>
    );
};

export default EditCar;