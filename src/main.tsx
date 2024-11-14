import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/Presentation/Login.tsx";
//import ProfilePage from "./ProfilePage/ProfilePage.tsx"; // Assuming ProfilePage is in a separate folder
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/*<Route path="/profile" element={<ProfilePage />} />*/}
            </Routes>
        </Router>
    </React.StrictMode>
);
