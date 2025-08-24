import React, {useState, useCallback, useEffect} from 'react';
import '../AdminPage.css';
import CompaniesTable from './CompaniesTable';
import AdminPanel from "../AdminPanel";
import GreenBtn from "../../button/GreenBtn";
import CompaniesModal from "./CompaniesModal";
import PaginationBar from "../PaginationBar";

const CompaniesPage = ({setIsAuthenticated}) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        limit: 10,
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
            <PaginationBar
                services={companies}
                pagination={pagination}
                setPagination={setPagination}
            />
            <CompaniesTable companies={companies}/>
            <CompaniesModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveCompany}
            />
        </div>
    );
};

export default CompaniesPage;