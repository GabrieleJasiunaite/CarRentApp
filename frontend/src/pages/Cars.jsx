import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { BodyTypeContext } from '../context/BodyTypeContext';

// Component displaying a list of cars with filtering options
const Cars = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { bodyType, fetchAllBodyTypes } = useContext(BodyTypeContext);

// Fetching all body types when the component mounts
    useEffect(() => {
        fetchAllBodyTypes();
    }, []);

// Fetching car data based on selected body type category
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/api/cars')

            if (response.status === 500) {
                setError('Užklausa buvo nesėkminga');
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
                {data ? (
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
                ) : (
                    <p>Duomenys kraunami...</p>
                )}
            </div>
        </div>
    );
};

export default Cars;
