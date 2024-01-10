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

                if (response.status === 500) {
                    setError('Užklausa buvo nesėkminga');
                    return;
                };

                const json = await response.json();

                if (response.ok) {
                    setReservations(json);
                    setError(null);
                };

            } catch (err) {
                setError(err);
            };
        };

        fetchReservations();

    }, [])

    const handleDelete = () => {

    };

    return (
        <div className="container">
            <h2>Visos rezervacijos</h2>
            {error && <div className="error">{error}</div>}
            {reservations.length === 0 && <div>Rezervacijų nėra</div>}
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
                        <div className="col"><div className={reservation.status}>{reservation.status}</div></div>
                        {reservation.status === "įvykdyta" ? (
                            <button className="edit" onClick={handleDelete}>Ištrinti</button>
                        ) : (
                            <Link to={`/reservations/edit/${reservation._id}`} state={reservation}><button className="edit">Redaguoti</button></Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reservations;