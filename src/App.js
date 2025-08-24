import React from "react";
import './styles/App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import CompaniesPage from "./components/admin/companies/CompaniesPage";
import ServicesPage from "./components/admin/services/ServicesPage";
import LoginPage from "./components/login/LoginPage";

function App() {

    const isAuthenticated = false;

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />
                    <Route
                        path="/companies"
                        element={
                            isAuthenticated ? <CompaniesPage /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            isAuthenticated ? <ServicesPage /> : <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? <Navigate to="/companies" replace /> : <Navigate to="/login" replace />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;