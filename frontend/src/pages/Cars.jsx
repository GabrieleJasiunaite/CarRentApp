import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { BodyTypeContext } from '../context/BodyTypeContext';

const Cars = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true)
    const { bodyType, fetchAllBodyTypes } = useContext(BodyTypeContext);

    useEffect(() => {
        fetchAllBodyTypes();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await fetch('http://localhost:8000/api/cars')

            if (response.status === 500) {
                setError('Užklausa buvo nesėkminga');
                setIsLoading(false)
                return;
            }

            const json = await response.json();
            setData(json);

            if (selectedCategory !== "all") {
                setData(json.filter(car => car.body === selectedCategory));
                setError(null);
            } else {
                setData(json);
                setError(null);
            };
            setIsLoading(false)
        };

        fetchData();

    }, [selectedCategory]);


    return (
        <div className='cars'>
            <div className="container">
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
                {isLoading ? (
                    <div className="loading-modal">
                        <div className="loading-content">
                            <p className="loading-text">Kraunasi...</p>
                        </div>
                    </div>
                ) : (
                    data && (
                    <ul>
                        {data.map((car, index) => (
                            <li key={index}>
                                <img src={car.imageUrl} alt={car.brand} />
                                <span className="title"><strong>Markė: </strong>{car.brand}</span>
                                <span className="title"><strong>Modelis: </strong>{car.model}</span>
                                <span className="title"><strong>Kuro tipas: </strong>{car.fuelType}</span>
                                <Link to={`/cars/${car._id}`}><button>Žiūrėti daugiau</button></Link>
                            </li>
                        ))}
                    </ul>
                    )
                )}
            </div>
        </div>
    );
};

export default Cars;
