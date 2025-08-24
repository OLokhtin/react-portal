import React from 'react';
import './CompanyModal.css'
import Input from "../input/Input";
import RedBtn from "../button/RedBtn";
import GreenBtn from "../button/GreenBtn";

const CompanyModal = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>Добавить компанию</h2>
                <form id="addCompanyForm">
                    <div className="form-group">
                        <label htmlFor="company_name">Название</label>
                        <Input type="text" id="company_name" required/>
                        <div className="error-message" id="name-error"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inn">ИНН</label>
                        <Input type="text" id="inn" required minLength="9" maxLength="12"/>
                        <div className="error-message" id="inn-error"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Статус</label>
                        <Input type="number" id="status" required/>
                        <div className="error-message" id="status-error"></div>
                    </div>
                    <div className="modal-actions">
                        <RedBtn type="button" id="cancelBtn" onClick={onClose}>Отмена</RedBtn>
                        <GreenBtn type="submit">Сохранить</GreenBtn>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyModal;