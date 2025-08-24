import React, {useState, useCallback, useEffect} from 'react';
import '../AdminPage.css';
import CompaniesTable from './CompaniesTable';
import AdminPanel from "../AdminPanel";
import GreenBtn from "../../button/GreenBtn";
import CompaniesModal from "./CompaniesModal";

const CompaniesPage = ({setIsAuthenticated}) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 50,
        offset: 0,
        total: 0
    });

    const fetchCompanies = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                limit: pagination.limit.toString(),
                offset: pagination.offset.toString()
            });

            const response = await fetch(`http://localhost:8000/api/companies?${params}`, {
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
            setCompanies(data.companies || data);

            if (data.total !== undefined) {
                setPagination(prev => ({ ...prev, total: data.total }));
            }
        } catch (err) {
            setError(err.message);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    }, [pagination.limit, pagination.offset, setIsAuthenticated]);

    useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleSaveCompany = async (companyData) => {
        const response = await fetch('http://localhost:8000/api/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(companyData),
        });

        if (!response.ok) {
            if (response.status === 401) {
                setIsAuthenticated(false);
                return;
            }
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

    const handleNextPage = () => {
        setPagination(prev => ({
            ...prev,
            offset: prev.offset + prev.limit
        }));
    };

    const handlePrevPage = () => {
        setPagination(prev => ({
            ...prev,
            offset: Math.max(0, prev.offset - prev.limit)
        }));
    };

    const handleLimitChange = (newLimit) => {
        setPagination(prev => ({
            ...prev,
            limit: newLimit,
            offset: 0 // Сбрасываем offset при изменении лимита
        }));
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (error) {
        return <div className="error">Ошибка: {error}</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-header"></div>
            <h1>Мои компании</h1>
            <div className="header-container">
                <AdminPanel />
                <GreenBtn onClick={handleOpenModal}>Добавить компанию</GreenBtn>
            </div>
            <div className="pagination-controls">
                <div className="pagination-info">
                    Показано: {companies.length} записей
                    {pagination.total > 0 && ` из ${pagination.total}`}
                </div>
                <div className="pagination-buttons">
                    <button
                        onClick={handlePrevPage}
                        disabled={pagination.offset === 0}
                        className="pagination-btn"
                    >
                        Назад
                    </button>

                    <select
                        value={pagination.limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="limit-select"
                    >
                        <option value={20}>20 записей</option>
                        <option value={50}>50 записей</option>
                        <option value={100}>100 записей</option>
                        <option value={200}>200 записей</option>
                    </select>

                    <button
                        onClick={handleNextPage}
                        disabled={companies.length < pagination.limit}
                        className="pagination-btn"
                    >
                        Вперед
                    </button>
                </div>
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