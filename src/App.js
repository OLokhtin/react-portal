import React from "react";
import './styles/App.css';
import AddBtn from "./components/UI/button/AddBtn";
import MyInput from "./components/UI/button/MyInput";

function App() {
    return (
        <form>
            <MyInput type="email" id="email" placeholder="Email" required/>
            <MyInput type="password" id="password" placeholder="Password" required/>
            <AddBtn>Войти</AddBtn>
        </form>
    );
}

export default App;