import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext';
import { BodyTypeContext } from '../../context/BodyTypeContext';
import './cars.css';

// Component displaying a list of cars with filtering options
const Cars = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true)
    const { bodyType, fetchAllBodyTypes } = useContext(BodyTypeContext);
    const { user } = useAuthContext();

    // Fetching all body types when the component mounts
    useEffect(() => {
        fetchAllBodyTypes();
    }, []);

    // Fetching car data based on selected body type category
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cars');

                if (response.status === 500) {
                    setError('Serverio klaida');
                    return;
                };

                const json = await response.json();

                if (selectedCategory !== "all") {
                    setData(json.filter(car => car.body === selectedCategory));
                    setIsLoading(false);
                    setError(null);
                } else {
                    setData(json);
                    setIsLoading(false);
                    setError(null);
                };
            } catch (err) {
                setError(err);
            };
        };
        fetchData();

    }, [selectedCategory]);

    return (
        <div className='container'>
            <div className='search'>
                <h3>Pasirinkite kėbulo tipą:</h3>
                <select defaultValue={"all"} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="all">Visi</option>
                    {bodyType.map(type => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div className="cars">
                {error && <div className='error'>{error}</div>}
                {!error && isLoading &&
                    <div className="loading-modal">
                        <div className="loading-content">
                            <p className="loading-text">Kraunasi...</p>
                        </div>
                    </div>}
                {data && (
                    <>
                        {data.map(car => (
                            <div className="car-display-container" key={car._id}>
                                <div className="car-pic-box">
                                    <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />
                                    <h3>{car.brand} {car.model}, {car.year}</h3>
                                </div>
                                <div className="car-info-box">
                                    <p><span className="iconify" data-icon="f7:car-fill"></span> {car.body}</p>
                                    <p><span className="iconify" data-icon="game-icons:car-seat"></span> {car.seats} vietų</p>
                                    <p><span className="iconify" data-icon="bi:fuel-pump"></span>{car.fuelType} </p>
                                    <p><span className="iconify" data-icon="game-icons:gear-stick-pattern"></span> {car.transmission}</p>
                                </div>
                                <div className="car-button-box">
                                    <p>{car.price} Eur <span>/parai</span></p>
                                    {!user.isAdmin &&
                                        <Link to={`/cars/${car._id}`}><button><strong>Rezervuoti</strong><i className="bi bi-arrow-right"></i></button></Link>
                                    }
                                    {user.isAdmin &&
                                        <Link to={`/cars/${car._id}`}><button><strong>Detaliau</strong><i className="bi bi-arrow-right"></i></button></Link>
                                    }

                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cars;

