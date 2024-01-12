import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs';
import './rentACar.css';

// Component for renting a car with date selection and agreement checkbox
const RentACar = ({ carDetails }) => {
    const { user } = useAuthContext();
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(null);

    const [disabledDays, setDisabledDays] = useState();
    let maxDate = dayjs().add(1, 'year');
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [successMessage, setSuccessMessage] = useState(null);

    // Fethces dates that are already reserved for this specific car
    useEffect(() => {
        const fetchTakenDates = async () => {
            try {
                const response = await fetch(`/api/reservations/dates/${carDetails._id}`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });

                if (response.status === 500) {
                    setError('Serverio klaida');
                    return;
                };

                const json = await response.json();

                if (!response.ok) {
                    setError(json.error);
                };

                setDisabledDays(json.map(date => new Date(date)));
                setError(null);

            } catch (err) {
                setError(err);
            };
        };

        fetchTakenDates();
    }, []);

    // Disables the resserved dates in the date picker
    const disableInputs = (date) => {
        return disabledDays.find(el => el.getMonth() === date.month() && el.getDate() === date.date());
    };

    // Handler for form submission
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

        if (dateReturned < dateRented) {
            setError("Pasirinkite datas nuo - iki");
            return;
        };

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                body: JSON.stringify({ car_id, carTitle, dateRented, dateReturned }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.status === 500) {
                setError('Serverio klaida');
                return;
            };

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            };

            setError(null);
            setSuccessMessage('Rezervacija suformuota');

        } catch (err) {
            setError(err);
        };
    };

    return (
        <div className="rent-table">
            <form onSubmit={handleSubmit}>
                <h3>Rezervuoti automobilį</h3>
                <label htmlFor="from">Nuo:</label>
                <DatePicker className="date" value={fromDate} onChange={value => setFromDate(value)} shouldDisableDate={disableInputs} disablePast maxDate={maxDate} sx={{
                    backgroundColor: "#fcfcfc",
                    border: "1px solid #00B4D8",
                    borderRadius: "5px",
                    width: 250,
                }} />
                <label>Iki:</label>
                <DatePicker className="date" value={toDate} onChange={value => setToDate(value)} shouldDisableDate={disableInputs} disablePast maxDate={maxDate} sx={{
                    backgroundColor: "#fcfcfc",
                    border: "1px solid #00B4D8",
                    borderRadius: "5px",
                    width: 250,
                }} />
                <div className="checkbox">
                    <input type="checkbox" id="agreement" onClick={() => setIsChecked(!isChecked)} />
                    <label htmlFor="agreement">Sutinku su <Link to='/privacypolicy'>privatumo</Link> bei <Link to='/rentpolicy'>nuomos</Link> politika</label>
                </div>
                {error && <div className="error">{error}</div>}
                <button className="confirm">Rezervuoti</button>
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