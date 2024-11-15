
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/Presentation/Login.tsx";
import TestSchema from "../src/Presentation/TestSchema.tsx"; // Import TestSchema component
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/testSchema" element={<TestSchema />} /> {/* Add TestSchema route */}
            </Routes>
        </Router>
    </React.StrictMode>
);