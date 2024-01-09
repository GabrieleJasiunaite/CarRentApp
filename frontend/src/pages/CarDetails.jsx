import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RentACar from '../components/RentACar';
import { useAuthContext } from '../hooks/useAuthContext';

const CarDetails = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [car, setCar] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/cars/${id}`);
                const json = await response.json();
                setCar(json);

            } catch (err) {
                setError(err);
            };
        };

        fetchCarDetails();
        setError(null);
    }, []);

    const handleDelete = async () => {
        const response = await fetch(`/api/cars/${id}`, {
            method: 'DELETE'
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        };

        if (response.ok) {
            setError(null);
            return navigate('/cars');
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
                        <img src={car.imageUrl} alt={car.brand + car.model} />
                        <div className="properties-rent-form">
                            <div className="properties-price">
                                <div className="properties"><p><strong>Metai: </strong>{car.year}</p>
                                    <p><strong>Kuro tipas: </strong>{car.fuelType}</p>
                                    <p><strong>Pavarų dėžė: </strong>{car.transmission}</p>
                                    <p><strong>Vietos: </strong>{car.seats}</p>
                                    <p><strong>Kėbulo tipas: </strong>{car.body}</p>
                                </div>
                                <h3>Nuomos kaina: <span className='rent-price'>{car.price}&euro; / d.</span></h3>
                                <Link to='/cars'>Grįžti atgal</Link>
                            </div>
                            {!user.isAdmin && <RentACar carDetails={car} />}
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default CarDetails;