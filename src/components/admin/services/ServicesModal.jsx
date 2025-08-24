import React from 'react';
import '../AdminModal.css'
import Input from "../../input/Input";
import RedBtn from "../../button/RedBtn";
import GreenBtn from "../../button/GreenBtn";

const ServicesModal = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>Добавить сервис</h2>
                <form id="addServiceForm">
                    <div className="form-group">
                        <label htmlFor="service_name">Название</label>
                        <Input type="text" id="service_name" required/>
                        <div className="error-message" id="service_name-error"></div>
                    </div><div className="form-group">
                        <label htmlFor="company_id">Компания</label>
                        <Input type="number" id="company_id" required/>
                        <div className="error-message" id="company_id-error"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_start_date">Дата начала</label>
                        <Input type="date" id="service_start_date" required/>
                        <div className="error-message" id="service_start_date-error"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_end_date">Дата окончания</label>
                        <Input type="date" id="service_end_date" required/>
                        <div className="error-message" id="service_end_date-error"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_type">Тип</label>
                        <Input type="number" id="service_type" required/>
                        <div className="error-message" id="type-error"></div>
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

export default ServicesModal;