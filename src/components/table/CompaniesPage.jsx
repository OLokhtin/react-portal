// CompaniesPage.jsx
import React, { useState, useEffect } from 'react';
import CompaniesTable from './CompaniesTable';
import './CompaniesPage.css';

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:8000/api/companies');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setCompanies(data);
        } catch (err) {
            setError(err.message);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="companies-page">
            <h1>Мои компании</h1>
            <CompaniesTable companies={companies} />
        </div>
    );
};

export default CompaniesPage;