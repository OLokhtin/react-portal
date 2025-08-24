import React from 'react';
import ServicesRow from './ServicesRow';
import '../AdminTable.css';

const ServicesTable = ({services}) => {
    if (!services || services.length === 0) {
        return null;
    }

    return (
        <div className="admin-table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>ID компании</th>
                    <th>Название</th>
                    <th>Дата начала</th>
                    <th>Дата окончания</th>
                    <th>Тип</th>
                </tr>
                </thead>
                <tbody>
                {services.map(service => (
                    <ServicesRow key={service.service_id} service={service} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServicesTable;