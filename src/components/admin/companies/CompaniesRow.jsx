import React from 'react';

const CompaniesRow = ({company}) => {
    return (
        <tr>
            <td>{company.company_id}</td>
            <td>{company.company_name}</td>
            <td>{company.inn}</td>
            <td>{company.status}</td>
        </tr>
    );
};

export default CompaniesRow;