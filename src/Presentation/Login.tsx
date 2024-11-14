import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { LoginUser } from "../../Application/UseCases/LoginUser";
//import { AuthRepositoryImpl } from "../../Infrastructure/AuthRepositoryImpl.ts";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Initialize AuthRepository and Use Case
    // const authRepository = new AuthRepositoryImpl();
    //const loginUser = new LoginUser(authRepository);

    useEffect(() => {
        // Placeholder for additional initialization logic, if needed
    }, []);

    const handleLogin = async () => {
        try {
            //const credentials = { email: username, password };
            // const user = await loginUser.execute(credentials);
            const user = true;
            if (user) {
                // Navigate to profile page on successful login
                navigate("/profile");
            } else {
                setError("Invalid username or password.");
            }
        } catch (err) {
            setError("An error occurred during login. Please try again.");
            console.error("Login error:", err);
        }
    };

    return (
        <main className="login-container">
            <div className="login-box">
                <h1 className="app-name">Recme</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} className="login-btn">Login</button>
                {error && <p className="error-message">{error}</p>}
                <div className="divider">--- Or ---</div>
                <button className="create-account-btn">Create Account</button>
            </div>
        </main>
    );
}

export default Login;
