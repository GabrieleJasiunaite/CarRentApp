import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

const Cars = () => {
  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/cars')
        if (!response.ok) {
          throw new Error('Užklausa buvo nesėkminga')
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Klaida gaudant duomenis:', error.message);
      }
    }

    fetchData();
  }, [])

  return (
    <div className='cars'>
      <Link to={'/new/drafts'}>New</Link>
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
  );
};

export default Cars;
