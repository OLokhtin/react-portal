import React from "react";
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompaniesPage from "./components/admin/companies/CompaniesPage";
import ServicesPage from "./components/admin/services/ServicesPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/companies" element={<CompaniesPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/" element={<CompaniesPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;