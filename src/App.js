import React, {useEffect, useState} from "react";
import './styles/App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import CompaniesPage from "./components/admin/companies/CompaniesPage";
import ServicesPage from "./components/admin/services/ServicesPage";
import LoginPage from "./components/login/LoginPage";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        setIsAuthenticated(false);
    }, []);

    // Функция для установки статуса авторизации после успешного входа
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    if (isAuthenticated === null) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ?
                                <Navigate to="/companies" replace /> :
                                <LoginPage onLoginSuccess={handleLoginSuccess} />
                        }
                    />
                    <Route
                        path="/companies"
                        element={
                            isAuthenticated ?
                                <CompaniesPage setIsAuthenticated={setIsAuthenticated} /> :
                                <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/services"
                        element={
                            isAuthenticated ?
                                <ServicesPage setIsAuthenticated={setIsAuthenticated} /> :
                                <Navigate to="/login" replace />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            isAuthenticated ?
                                <Navigate to="/companies" replace /> :
                                <Navigate to="/login" replace />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;