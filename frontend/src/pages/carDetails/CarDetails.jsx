import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RentACar from '../../components/rentACar/RentACar';
import { useAuthContext } from '../../hooks/useAuthContext';
import './carDetails.css';

// Component displaying detailed information about a specific car
const CarDetails = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [car, setCar] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetching car details from the server when the component mounts
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`/api/cars/${id}`);

                if (response.status === 500) {
                    setError('Serverio klaida');
                    return;
                };

                const json = await response.json();

                if (!response.ok) {
                    setError(json.error);
                    return;
                };

                setCar(json);
                setError(null);

            } catch (err) {
                setError(err);
            };
        };
        fetchCarDetails();

    }, []);


    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/cars/${id}`, {
                method: 'DELETE'
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

        } catch (err) {
            setError(err);
        };
    };

    return (
        <div className='container'>
            <div className="car-details">
                {error && <div className='error'>{error}</div>}
                {car &&
                    <>
                        <h2>{car.brand} {car.model} detali informacija</h2>
                        {user.isAdmin &&
                            <div className='buttons'>
                                <Link to={`/cars/edit/${id}`} state={car} >
                                    <button className='edit'>Redaguoti</button>
                                </Link>
                                <button className='delete' onClick={handleDelete}>Ištrinti</button>
                            </div>
                        }
                        <div className="car-pic-box">
                            <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                            <h3>{car.brand} {car.model}, {car.year}</h3>
                        </div>
                        <div className="properties-rent-form">
                            <div className="properties-price">
                                <div className="car-info-box">
                                    <p><span className="iconify" data-icon="f7:car-fill"></span> {car.body}</p>
                                    <p><span className="iconify" data-icon="game-icons:car-seat"></span> {car.seats} vietų</p>
                                    <p><span className="iconify" data-icon="bi:fuel-pump"></span>{car.fuelType} </p>
                                    <p><span className="iconify" data-icon="game-icons:gear-stick-pattern"></span> {car.transmission}</p>
                                </div>
                                <p className='price'>{car.price} Eur <span>/parai</span></p>
                            </div>
                            {!user.isAdmin && <RentACar carDetails={car} />}
                        </div>
                        <Link to='/cars'>Grįžti atgal</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default CarDetails;