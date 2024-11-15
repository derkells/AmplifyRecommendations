import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize the navigate function

    function loginUser() {
        console.log('user is logged in');
        // Add any logic to validate the login credentials here

        // Navigate to TestSchema route
        navigate("/testSchema");
    }

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
                <button onClick={loginUser} className="login-btn">
                    Login
                </button>
                <div className="divider">--- Or ---</div>
                <button className="create-account-btn">Create Account</button>
            </div>
        </main>
    );
}

export default Login;
