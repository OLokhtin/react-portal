import React, { useState, useEffect } from 'react';
import '../AdminPage.css';
import ServicesTable from './ServicesTable';
import GreenBtn from "../../button/GreenBtn";
import ServicesModal from "./ServicesModal";
import AdminPanel from "../AdminPanel";

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://localhost:8000/api/services');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setServices(data);
        } catch (err) {
            setError(err.message);
            setServices([]);
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
        <div className="admin-page">
            <h1>Мои сервисы</h1>
            <div className="header-container">
                <AdminPanel />
                <GreenBtn onClick={handleOpenModal}>Добавить сервис</GreenBtn>
            </div>
            <ServicesTable services={services}/>
            <ServicesModal isOpen={isModalOpen} onClose={handleCloseModal}></ServicesModal>
        </div>
    );
};

export default ServicesPage;