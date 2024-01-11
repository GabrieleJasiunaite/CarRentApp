import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import './login-signup.css';

// SignUp component for user registration
const SignUp = () => {
    // State for storing user input (email and password)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Custom hook for handling user registration logic
    const { signup, error: signupError, isLoading } = useSignup();
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (email === '' || password === '' || confirmPass === '') {
            setError('Užpildykite visus laukus');
            return;
        };

        if (password !== confirmPass) {
            setError('Slaptažodžiai nesutampa');
            return;
        };

        await signup(email, password);
    };

    return (
        <div className="container">
            <div className="login-signup-div">
                <form className="login-signup" onSubmit={handleSubmit}>
                    <h3>Registracija</h3>
                    <label htmlFor="email">El. paštas:</label>
                    <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <label htmlFor="password">Slaptažodis: </label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <label htmlFor="password">Pakartoti slaptažodį: </label>
                    <input type="password" id="passwordConfirm" onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass} />
                    <button disabled={isLoading}>Registruotis</button>
                    {(error || signupError) && <div className="error">{error ? error : signupError}</div>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;