import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const NewCar = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (imageUrl === "" || model === "" || brand === "" || !price || !year || fuelType === "" || transmission === "" || !seats || body === "") {
            setError("Užpildykite visus laukus");
            return;
        };

        const response = await fetch('http://localhost:8000/api/cars', {
            method: 'POST',
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
            return navigate('/cars')
        };
    };

    return (
        <div className="container">
            <div className="new-car">
                <form onSubmit={handleSubmit} className={error ? "form-error" : ""}>
                    <h3>Pridėti automobilį</h3>
                    <Link className="drafts" to={'/new/drafts'}>Juodraščiai</Link>
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
                    <div className="buttons">
                        <button className="link-btn"><Link to={'/cars'}>Grįžti atgal</Link></button>
                        <button>Pridėti</button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default NewCar;