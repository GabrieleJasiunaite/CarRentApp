import { createContext, useState } from "react";

// Define the body type context for car body types
export const BodyTypeContext = createContext();

// BodyTypeContextProvider component to wrap the application and manage body type state
export const BodyTypeContextProvider = ({ children }) => {
    const [bodyType, setBodyType] = useState([]);
    const [error, setError] = useState(null);

    const fetchAllBodyTypes = async () => {
        const response = await fetch('/api/cars/types');

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