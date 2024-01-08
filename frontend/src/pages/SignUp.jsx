import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

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