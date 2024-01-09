import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/reservations", {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });

                const json = await response.json();

                if (response.ok) {
                    setReservations(json);
                    setError(null)
                };

            } catch (err) {
                setError(err);
            };
        };

        fetchReservations();

    }, [])

    return (
        <div className="container">
            <h2>Visos rezervacijos</h2>
            <div className="reservations-table">
                <div className="row">
                    {user.isAdmin && <div className="col">Vartotojas</div>}
                    <div className="col">Automobilis</div>
                    <div className="col">Rezervuota nuo:</div>
                    <div className="col">Rezervuota iki:</div>
                    <div className="col">Statusas:</div>
                </div>
                {reservations.map((reservation) => (
                    <div className="row" key={reservation._id}>
                        {user.isAdmin && <div className="col">{reservation.email}</div>}
                        <div className="col">{reservation.carTitle}</div>
                        <div className="col">{reservation.dateRented.slice(0, 10)}</div>
                        <div className="col">{reservation.dateReturned.slice(0, 10)}</div>
                        <div className="col">{reservation.status}</div>
                        <Link to={`/reservations/edit/${reservation._id}`} state={reservation}>
                            <button className="edit">Redaguoti</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reservations;