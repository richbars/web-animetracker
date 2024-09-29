import React from "react";
import BuscarCEP from "./buscarcep/buscarcep";
import AnimeTracker from "./animetracker/animetracker";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/animetracker" element={<AnimeTracker />} />
                <Route path="/buscarcep" element={<BuscarCEP />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
