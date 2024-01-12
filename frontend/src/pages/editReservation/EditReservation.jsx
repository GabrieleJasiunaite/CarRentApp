import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from 'dayjs'
import './editReservation.css';

// Component for editing reservation details
const EditReservation = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const reservation = location.state;

    // State variables for managing form inputs and data
    const [error, setError] = useState(null);
    const [cars, setCars] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(reservation.status)
    const [selectedCar, setSelectedCar] = useState();
    const [disabledDays, setDisabledDays] = useState();
    let maxDate = dayjs().add(1, 'year');
    const [fromDate, setFromDate] = useState(dayjs(reservation.dateRented));
    const [toDate, setToDate] = useState(dayjs(reservation.dateReturned));

    // Fethces dates that are already reserved for this specific car
    useEffect(() => {
        const fetchTakenDates = async () => {
            try {
                const response = await fetch(`/api/reservations/dates/${reservation.car_id}`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
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

                setDisabledDays(json.map(date => new Date(date)));
                setError(null);

            } catch (err) {
                setError(err);
            };
        };

        fetchTakenDates();
    }, [selectedCar]);

    // Fetching the list of cars for the dropdown menu
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('/api/cars');

                if (response.status === 500) {
                    setError('Serverio klaida');
                    return;
                };

                const json = await response.json();

                if (!response.ok) {
                    setError(json.error);
                    return;
                };

                setCars(json);
                setSelectedCar(json.filter(car => car._id === reservation.car_id)[0]);

            } catch (err) {
                setError(err);
            };
        };

        fetchCars();
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

        if (!selectedCar) {
            setError("Pasirinkite automobilį");
            return;
        };

        const filteredCar = cars.find(car => car._id === selectedCar._id);
        const dateRented = new Date(fromDate);
        const dateReturned = new Date(toDate)

        if (dateReturned < dateRented) {
            setError("Pasirinkite datas nuo - iki");
            return;
        };

        try {
            const response = await fetch(`/api/reservations/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    car_id: selectedCar._id,
                    carTitle: filteredCar.brand + filteredCar.model,
                    user_id: reservation.user_id,
                    email: reservation.email,
                    dateRented: dateRented,
                    dateReturned: dateReturned,
                    status: user.isAdmin ? selectedStatus : 'pending'
                }),
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
                return;
            };

            setError(null);
            navigate('/reservations');

        } catch (err) {
            setError(err);
        };
    };

    // Handles the deletion of the specific reservation
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/reservations/${reservation._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
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

            navigate('/reservations')

        } catch (err) {
            setError(err);
        };
    }

    return (
        <div className="container">
            <div className="edit-reservation">
                <div className="form-cancel">
                    {disabledDays && selectedCar &&
                        <form onSubmit={handleSubmit} className={error ? "form-error" : ""}>
                            <h3>Redaguoti rezervaciją</h3>
                            <label htmlFor="from">Nuo:</label>
                            <DatePicker className="from-date" value={fromDate} onChange={value => setFromDate(value)} shouldDisableDate={disableInputs} disablePast maxDate={maxDate} sx={{
                                backgroundColor: "#00aff514",
                                border: "1px solid #00B4D8",
                                borderRadius: "5px",
                                width: 200,
                                margin: "0 auto"
                            }} />
                            <label htmlFor="to">Iki:</label>
                            <DatePicker className="to-date" value={toDate} onChange={value => setToDate(value)} shouldDisableDate={disableInputs} disablePast maxDate={maxDate} sx={{
                                backgroundColor: "#00aff514",
                                border: "1px solid #00B4D8",
                                borderRadius: "5px",
                                width: 200,
                                margin: "0 auto"
                            }} />
                            <select name="cars" id="cars" defaultValue={reservation.car_id} onChange={(e) => setSelectedCar(cars.filter(el => el._id === e.target.value)[0])}>
                                <option value={reservation.car_id}>{cars.find(el => el._id === reservation.car_id).brand + " " + cars.find(el => el._id === reservation.car_id).model}</option>
                                {cars.map((car) => (
                                    <option key={car._id} value={car._id}>{car.brand + " " + car.model}</option>
                                ))
                                }
                            </select>
                            {user.isAdmin &&
                                <select name="status" id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} >
                                    <option value="pending">Laukiama</option>
                                    <option value="confirmed">Patvirtinta</option>
                                    <option value="cancelled">Atšaukta</option>
                                    <option value="completed">Įvykdyta</option>
                                </select>}
                            <div className="buttons">
                                <button className="link-btn"><Link to={`/reservations/`}>Grįžti atgal</Link></button>
                                <button className="link-btn">Redaguoti</button>
                            </div>

                            {error && <div className="error">{error}</div>}
                        </form>
                    }
                    {!user.isAdmin && <button className="link-btn delete" onClick={handleDelete}>Atšaukti rezervaciją</button>}
                </div>
                {selectedCar &&
                    <div className="car-display-container">
                        <div className="car-pic-box">
                            <img src={selectedCar.imageUrl} alt={`${selectedCar.brand} ${selectedCar.model}, ${selectedCar.year}`} />
                            <h3>{selectedCar.brand} {selectedCar.model}, {selectedCar.year}</h3>
                        </div>
                        <div className="car-info-box">
                            <p><span className="iconify" data-icon="f7:car-fill"></span> {selectedCar.body}</p>
                            <p><span className="iconify" data-icon="game-icons:car-seat"></span> {selectedCar.seats} vietų</p>
                            <p><span className="iconify" data-icon="bi:fuel-pump"></span>{selectedCar.fuelType} </p>
                            <p><span className="iconify" data-icon="game-icons:gear-stick-pattern"></span> {selectedCar.transmission}</p>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
};

export default EditReservation;
