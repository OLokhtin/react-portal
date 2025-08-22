import React from 'react';

const Table = () => {
    return (
        <body>
        <nav>
            <a href="companies.html" className="active">Компании</a>
            <a href="Auth.html">Сервисы</a>
            <a href="users.html">Пользователи</a>
        </nav>

        <button id="logoutBtn">Выйти</button>

        <div className="header-container">
            <h1>Список компаний</h1>
        </div>

        <table id="companiesTable">
            <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>ИНН</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>

        </body>
    );
};

export default Table;