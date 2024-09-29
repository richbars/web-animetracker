import React from "react";
import BuscarCEP from "./buscarcep/buscarcep";
import AnimeTracker from "./animetracker/animetracker";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./animetracker/details";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/:type/:id" element={<Details />} />
                <Route path="/animetracker" element={<AnimeTracker />} />
                <Route path="/buscarcep" element={<BuscarCEP />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
