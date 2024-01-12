import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './newCar.css';

// NewCar component for adding a new car to the system
const NewCar = () => {
    // React Router hook for navigation
    const navigate = useNavigate();
    const location = useLocation();
    const [success, setSuccess] = useState(null);
    const [allDrafts, setAllDrafts] = useState([]);

    // State variables for form fields and error handling
    const [error, setError] = useState(null);
    const [imageUrl, setimageUrl] = useState('');
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState();
    const [year, setYear] = useState();
    const [fuelType, setFuelType] = useState('');
    const [transmission, setTransmission] = useState('');
    const [seats, setSeats] = useState();
    const [body, setBody] = useState('');

    useEffect(() => {
        if (location.state) {
            const state = location.state;
            setimageUrl(state.imageUrl);
            setModel(state.model);
            setBrand(state.brand);
            setPrice(state.price);
            setYear(state.year);
            setFuelType(state.fuelType);
            setTransmission(state.transmission);
            setSeats(state.seats);
            setBody(state.body);
        };
    }, [])

    useEffect(() => {
        const json = localStorage.getItem("drafts");
        if (!json) {
            return;
        };

        const drafts = JSON.parse(json);
        if (drafts) {
            setAllDrafts(drafts);
        };

    }, []);

    // Handle form submission for adding a new car
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!imageUrl || !model || !brand || !price || !year || !fuelType || !transmission || !seats || !body) {
            setError("Užpildykite visus laukus");
            return;
        };

        const response = await fetch('/api/cars', {
            method: 'POST',
            body: JSON.stringify({ imageUrl, model, brand, price, year, fuelType, transmission, seats, body }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.status === 500) {
            setError('Serverio klaida');
            return;
        };

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            return;
        };

        setError(null);
        return navigate('/cars');

    };

    const saveDraft = () => {
        const today = new Date();
        const dateYear = today.getFullYear();
        const dateMonth = String(today.getMonth() + 1).padStart(2, '0');
        const dateDay = String(today.getDate()).padStart(2, '0');
        const date = dateYear + "-" + dateMonth + "-" + dateDay;
        const id = uuidv4();

        const drafts = [...allDrafts, { id, imageUrl, model, brand, price, year, fuelType, transmission, seats, body, date }];
        localStorage.setItem('drafts', JSON.stringify(drafts));
        setSuccess("Juodraštis išsaugotas");
    };

    return (
        <div className="container">
            <div className="new-car">
                <form onSubmit={handleSubmit} className={error ? "form-error" : ""}>
                    <h3>Pridėti automobilį</h3>
                    <Link className="drafts" to={'/new/drafts'}>Juodraščiai</Link>
                    <label htmlFor="imgUrl">Paveikslėlio nuoroda: </label>
                    <input type="text" id="imgUrl" value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} />
                    <label htmlFor="bran">Markė: </label>
                    <input type="text" id="bran" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <label htmlFor="model">Modelis: </label>
                    <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
                    <label htmlFor="price">Nuomos kaina (dienos): </label>
                    <input type="number" id="price" min={0} value={price} onChange={(e) => setPrice(e.target.value)} />
                    <label htmlFor="year">Metai: </label>
                    <input type="number" id="year" min={1900} value={year} onChange={(e) => setYear(e.target.value)} />
                    <label htmlFor="fuelType">Kuro tipas: </label>
                    <input type="text" id="fuelType" value={fuelType} onChange={(e) => setFuelType(e.target.value)} />
                    <label htmlFor="transmission">Pavarų dėžė: </label>
                    <input type="text" id="transmission" value={transmission} onChange={(e) => setTransmission(e.target.value)} />
                    <label htmlFor="seats">Vietos: </label>
                    <input type="number" id="seats" min={2} value={seats} onChange={(e) => setSeats(e.target.value)} />
                    <label htmlFor="body">Kėbulo tipas: </label>
                    <input type="text" id="body" value={body} onChange={(e) => setBody(e.target.value)} />
                    <div className="buttons">
                        <button className="link-btn"><Link to={'/cars'}>Grįžti atgal</Link></button>
                        <button>Pridėti</button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
                <button className="save-draft" onClick={saveDraft}>Išsaugoti juodraštį</button>
                {success && <div className="success">{success}</div>}
            </div>
        </div>
    );
};

export default NewCar;