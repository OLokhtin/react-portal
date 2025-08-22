import React from 'react';

const Auth = () => {
    return (
        <body>
            <h1>Авторизация</h1>
            <div id="error" className="error"></div>
            <form id="loginForm">
                <input type="email" id="email" placeholder="Email" required/>
                <input type="password" id="password" placeholder="Password" required/>
                <button type="submit">Войти</button>
            </form>
        </body>
    );
};

export default Auth;