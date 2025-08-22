import React from "react";
import './styles/App.css';
import GreenBtn from "./components/UI/button/GreenBtn";
import MyInput from "./components/UI/button/MyInput";

function App() {
    return (
        <div className="App">
            <form>
                <MyInput type="email" id="email" placeholder="Email" required/>
                <MyInput type="password" id="password" placeholder="Password" required/>
                <GreenBtn>Войти</GreenBtn>
            </form>
        </div>
    );
}

export default App;