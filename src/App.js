import React from "react";
import CompaniesTable from "./components/companies/CompaniesTable";
import RedBtn from "./components/button/RedBtn";
import Input from "./components/input/Input";

function App() {
    return (
        <div className="App">
            <h1>Мои компании</h1>
            <Input/>
            <RedBtn>Выход</RedBtn>
            <CompaniesTable companies={[{company_id: 1, company_name: 'AAAAAA', inn: 123456789, status: 1}]} columns="status"/>
        </div>
    );
}

export default App;