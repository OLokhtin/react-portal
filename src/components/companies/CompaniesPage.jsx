import React, { useState, useEffect } from 'react';
import './CompaniesPage.css';
import CompaniesTable from './CompaniesTable';
import CompaniesPanel from "./CompaniesPanel";
import GreenBtn from "../button/GreenBtn";
import CompanyModal from "./CompanyModal";

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
        <div className="companies-page">
            <h1>Мои компании</h1>
            <div className="header-container">
                <CompaniesPanel></CompaniesPanel>
                <GreenBtn onClick={handleOpenModal}>Добавить компанию</GreenBtn>
            </div>
            <CompaniesTable companies={companies}/>
            <CompanyModal isOpen={isModalOpen} onClose={handleCloseModal}></CompanyModal>
        </div>
    );
};

export default CompaniesPage;