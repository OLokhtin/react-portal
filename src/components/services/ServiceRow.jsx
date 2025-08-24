import React from 'react';

const ServiceRow = ({service}) => {
    return (
        <tr>
            <td>{service.service_id}</td>
            <td>{service.company_id}</td>
            <td>{service.service_name}</td>
            <td>{service.service_start_date}</td>
            <td>{service.service_end_date}</td>
            <td>{service.service_type}</td>
        </tr>
    );
};

export default ServiceRow;