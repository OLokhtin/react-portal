import React from 'react';

const CompanyRow = ({company}) => {
    return (
        <tr>
            <td>{company.company_id}</td>
            <td>{company.company_name}</td>
            <td>{company.inn}</td>
            <td>{company.status}</td>
        </tr>
    );
};

export default CompanyRow;