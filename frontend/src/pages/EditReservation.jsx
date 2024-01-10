import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

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
    const [status, setStatus] = useState(reservation.state)
    const [selectedCar, setSelectedCar] = useState();
    const [currentDate, setCurrentDate] = useState();
    const [maxDate, setMaxDate] = useState();
    const [fromDate, setFromDate] = useState(reservation.dateRented.slice(0, 10));
    const [toDate, setToDate] = useState(reservation.dateReturned.slice(0, 10));

// Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!fromDate || !toDate) {
            setError("Pasirinkite nuomos datą");
            return;
        };

        if (selectedCar === "" || !selectedCar) {
            setError("Pasirinkite automobilį");
            return;
        };

        const car_id = selectedCar._id;
        const carTitle = e.target[0].selectedOptions[0].outerText;
        const user_id = reservation.user_id;
        const email = reservation.email;
        const dateRented = new Date(fromDate);
        const dateReturned = new Date(toDate);
        const status = reservation.status;

        const response = await fetch(`http://localhost:8000/api/reservations/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ car_id, carTitle, user_id, email, dateRented, dateReturned, status }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        if (response.status === 500) {
            setError('Can not connect to server');
            return;
        };
        console.log(response);
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        };

        if (response.ok) {
            setError(null);
            navigate('/reservations');
        };

    };
// Setting the current date and maximum date allowed in the date inputs
    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        setCurrentDate(year + "-" + month + "-" + day);
        setMaxDate((year + 1) + "-" + month + "-" + day);
    }, []);
// Fetching the list of cars for the dropdown menu
    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('http://localhost:8000/api/cars');
            const json = await response.json();

            if (response.ok) {
                setCars(json);
            };

            if (!response.ok) {
                setError('Negalejom uzkrauti duomenu');
            };
        };

        fetchCars();
    }, []);

    // Logging the selected car when it changes
    useEffect(() => {
        console.log(selectedCar)
    }, [selectedCar])

    return (
        <div className="container">
            <div className="edit-reservation">
                <form onSubmit={handleSubmit} className={error ? "form-error" : ""}>
                    <h3>Redaguoti rezervaciją</h3>
                    <select name="cars" id="cars" defaultValue={""} onChange={(e) => setSelectedCar(cars.filter(el => el._id === e.target.value)[0])}>
                        <option value={""} disabled>Pasirinkite automobilį</option>
                        {cars.map((car) => (
                            <option key={car._id} value={car._id}>{car.brand + " " + car.model}</option>
                        ))
                        }
                    </select>
                    <label htmlFor="from">Nuo:
                        <input type="date" id="from" value={fromDate} min={currentDate} max={maxDate} className="date" onChange={(e) => setFromDate(e.target.value)} /></label>
                    <label htmlFor="to">Iki:
                        <input type="date" id="to" value={toDate} min={currentDate} max={maxDate} className="date" onChange={(e) => setToDate(e.target.value)} /></label>
                    {user.isAdmin &&
                        <select name="status" id="status" defaultValue={status} onChange={(e) => setStatus(e.target.value)} >
                            <option value="laukiama">Laukiama</option>
                            <option value="patvirtinta">Patvirtinta</option>
                            <option value="atšaukta">Atšaukta</option>
                            <option value="atšaukta">Įvykdyta</option>
                        </select>}
                    <div className="buttons">
                        <button className="link-btn"><Link to={`/reservations/`}>Grįžti atgal</Link></button>
                        <button>Redaguoti</button>
                    </div>

                    {error && <div className="error">{error}</div>}
                </form>
                {!user.isAdmin && <button className="delete">Atšaukti rezervaciją</button>}
                {selectedCar && <div className="selected-car">
                    <img src={selectedCar.imageUrl} alt={selectedCar.brand + selectedCar.model} />
                    <div className="properties-price">
                        <div className="properties"><p><strong>Metai: </strong>{selectedCar.year}</p>
                            <p><strong>Kuro tipas: </strong>{selectedCar.fuelType}</p>
                            <p><strong>Pavarų dėžė: </strong>{selectedCar.transmission}</p>
                            <p><strong>Vietos: </strong>{selectedCar.seats}</p>
                            <p><strong>Kėbulo tipas: </strong>{selectedCar.body}</p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default EditReservation;