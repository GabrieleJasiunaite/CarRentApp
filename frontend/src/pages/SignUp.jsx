import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

// SignUp component for user registration
const SignUp = () => {
    // State for storing user input (email and password)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Custom hook for handling user registration logic
    const { signup, error, isLoading } = useSignup();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    <button disabled={isLoading}>Registruotis</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default SignUp;