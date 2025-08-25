import React, {useState, useEffect, useCallback} from 'react';
import '../AdminPage.css';
import ServicesTable from './ServicesTable';
import GreenBtn from "../../button/GreenBtn";
import ServicesModal from "./ServicesModal";
import AdminPanel from "../AdminPanel";
import PaginationBar from "../PaginationBar";

const ServicesPage = (setIsAuthenticated) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 10,
        offset: 0,
        total: 0
    });

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                limit: pagination.limit.toString(),
                offset: pagination.offset.toString()
            });

            const response = await fetch(`http://localhost:8000/api/services?${params}`, {
                credentials: 'include',
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setIsAuthenticated(false);
                    return;
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setServices(data.services || data);

            if (data.total !== undefined) {
                setPagination(prev => ({ ...prev, total: data.total }));
            }
        } catch (err) {
            setError(err.message);
            setServices([]);
        } finally {
            setLoading(false);
        }
    }, [pagination.limit, pagination.offset, setIsAuthenticated]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleSaveService = async (serviceData) => {
        const response = await fetch('http://localhost:8000/api/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(serviceData),
        });

        if (!response.ok) {
            if (response.status === 401) {
                setIsAuthenticated(false);
                return;
            }
            throw new Error('Ошибка при создании сервиса');
        }

        fetchServices();
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
            <PaginationBar
                services={services}
                pagination={pagination}
                setPagination={setPagination}
            />
            <ServicesTable services={services}/>
            <ServicesModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveService}
            />
        </div>
    );
};

export default ServicesPage;