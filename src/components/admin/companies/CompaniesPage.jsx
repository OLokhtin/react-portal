import React, { useState, useEffect } from 'react';
import '../AdminPage.css';
import CompaniesTable from './CompaniesTable';
import AdminPanel from "../AdminPanel";
import GreenBtn from "../../button/GreenBtn";
import CompaniesModal from "./CompaniesModal";

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleSaveCompany = async (companyData) => {
        const response = await fetch('http://localhost:8000/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(companyData),
        });

        if (!response.ok) {
            throw new Error('Ошибка при создании компании');
        }

        fetchCompanies();
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="admin-page">
            <h1>Мои компании</h1>
            <div className="header-container">
                <AdminPanel />
                <GreenBtn onClick={handleOpenModal}>Добавить компанию</GreenBtn>
            </div>
            <CompaniesTable companies={companies}/>
            <CompaniesModal isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSave={handleSaveCompany}
            />
        </div>
    );
};

export default CompaniesPage;