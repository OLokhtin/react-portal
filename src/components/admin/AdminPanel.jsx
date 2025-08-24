import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const location = useLocation();

    return (
        <nav className="admin-panel">
            <div className="panel-container">
                <Link
                    to="/companies"
                    className={`panel-tab ${location.pathname === '/companies' ? 'panel-tab--active' : ''}`}
                >
                    Компании
                </Link>
                <Link
                    to="/services"
                    className={`panel-tab ${location.pathname === '/services' ? 'panel-tab--active' : ''}`}
                >
                    Сервисы
                </Link>
            </div>
        </nav>
    );
};

export default AdminPanel;