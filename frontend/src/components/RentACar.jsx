import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

// Component for renting a car with date selection and agreement checkbox
const RentACar = ({ carDetails }) => {
    const { user } = useAuthContext();
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState();
    const [maxDate, setMaxDate] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
    // Set current date and max date for date inputs
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        setCurrentDate(year + "-" + month + "-" + day);
        setMaxDate((year + 1) + "-" + month + "-" + day)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!fromDate || !toDate) {
            setError("Pasirinkite nuomos datą");
            return;
        };
        if (!isChecked) {
            setError("Turite sutikti su privatumo ir nuomos politika");
            return;
        };

        const car_id = carDetails._id;
        const carTitle = `${carDetails.brand} ${carDetails.model}`
        const dateRented = new Date(fromDate);
        const dateReturned = new Date(toDate);

        const response = await fetch('http://localhost:8000/api/reservations', {
            method: 'POST',
            body: JSON.stringify({ car_id, carTitle, dateRented, dateReturned }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
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
            setSuccessMessage('Rezervacija suformuota');
        };
    };

    return (
        <div className="rent-table">
            <form onSubmit={handleSubmit}>
                <h3>Rezervuoti automobilį</h3>
                <label htmlFor="from">Nuo:
                    <input type="date" id="from" min={currentDate} max={maxDate} className="date" onChange={(e) => setFromDate(e.target.value)} /></label>
                <label htmlFor="to">Iki:
                    <input type="date" id="to" min={currentDate} max={maxDate} className="date" onChange={(e) => setToDate(e.target.value)} /></label>
                <input type="checkbox" id="agreement" onClick={() => setIsChecked(!isChecked)} />
                <label htmlFor="agreement">Sutinku su <Link to='/privacypolicy'>privatumo</Link> bei <Link to='/rentpolicy'>nuomos</Link> politika</label>
                {error && <div className="error">{error}</div>}
                <button>Rezervuoti</button>
            </form>
            {successMessage &&
                <div className="success-bg">
                    <div className="success">
                        <h3>{successMessage}</h3>
                        <Link to='/cars'><button>Atgal į pradžią</button></Link>
                        <Link to='/reservations'><button>Mano rezervacijos</button></Link>
                    </div>
                </div>
            }
        </div>
    );
};

export default RentACar;