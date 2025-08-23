import React from 'react';
import CompanyRow from './CompanyRow';
import './CompaniesTable.css';

const CompaniesTable = ({companies}) => {
    if (!companies || companies.length === 0) {
        return null;
    }

    return (
        <div className="companies-table">
            <table>
                <thead>
                <tr>
                    <th>ID компании</th>
                    <th>Название компании</th>
                    <th>ИНН</th>
                    <th>Статус</th>
                </tr>
                </thead>
                <tbody>
                {companies.map(company => (
                    <CompanyRow key={company.company_id} company={company} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompaniesTable;