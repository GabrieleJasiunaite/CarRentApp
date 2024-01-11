import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import './login-signup.css';

// LogIn component with email, password fields, and login functionality
const LogIn = () => {
    // State for email and password input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login, error: signupError, isLoading } = useLogin();

    // Handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (email === '' || password === '') {
            setError('Užpildykite visus laukus');
            return;
        };

        await login(email, password);
    };

    return (
        <div className="container">
            <div className="login-signup-div">
                <form className="login-signup" onSubmit={handleSubmit}>
                    <h3>Prisijungimas</h3>
                    <label htmlFor="email">El. paštas:</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="password">Slaptažodis: </label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button disabled={isLoading}>Prisijungti</button>
                    {(error || signupError) && <div className="error">{error ? error : signupError}</div>}
                </form>
            </div>
        </div>
    );
};

export default LogIn;