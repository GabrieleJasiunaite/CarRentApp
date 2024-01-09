import { createContext, useState } from "react";

export const BodyTypeContext = createContext();

export const BodyTypeContextProvider = ({ children }) => {
    const [bodyType, setBodyType] = useState([]);
    const [error, setError] = useState(null);

    const fetchAllBodyTypes = async () => {
        const response = await fetch('http://localhost:8000/api/cars/types');

        if (response.status === 500) {
            setError('Can not connect to server');
            return;
        };

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        };

        if (response.ok) {
            setBodyType(json.map((el) => el._id).sort());
            setError(null);
        };
    };

    return (
        <BodyTypeContext.Provider value={{ bodyType, fetchAllBodyTypes, error }}>
            {children}
        </BodyTypeContext.Provider>
    );
};

export default BodyTypeContextProvider;