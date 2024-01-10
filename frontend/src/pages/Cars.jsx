import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import {BodyTypeContext} from '../context/BodyTypeContext'

const Cars = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const {user} = useAuthContext()
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { bodyType, fetchAllBodyTypes } = useContext(BodyTypeContext);

  useEffect(() => {
      fetchAllBodyTypes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/cars')
            if (response.status === 500) {
                setError('Užklausa buvo nesėkminga');
                return;
            }

            const json = await response.json();
            if (selectedCategory !== "all") {
                setData(json.filter(car => car.body === selectedCategory));
                setError(null);
            } else {
                setData(json);
                setError(null);
            };
        } catch (err) {
            setError(err);
        };
    };

    fetchData();
}, [selectedCategory]);
  
  
 

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
        console.error('Klaida gaunant duomenis:', error.message);
      }
    }

    fetchData();
  }, [])
  return (
    <>
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
                          <Link to={`/cars/${car._id}`}><button>Rezervuoti<i className="bi bi-arrow-right"></i></button></Link>
                          }
                          {user.isAdmin &&
                          <Link to={`/cars/${car._id}`}><button>Detaliau<i className="bi bi-arrow-right"></i></button></Link>
                          }     
                        
                      </div>
                  </div>
              ))}
            </> 
          )}
      </div>
    </>
  );
};

export default Cars;

