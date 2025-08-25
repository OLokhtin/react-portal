import React, {useEffect, useState} from 'react';
import '../AdminModal.css'
import Input from "../../input/Input";
import RedBtn from "../../button/RedBtn";
import GreenBtn from "../../button/GreenBtn";

const ServicesModal = ({isOpen, onClose, onSave}) => {

    const [formData, setFormData] = useState({
        service_name: '',
        company_id: 1,
        service_start_date: '',
        service_end_date: '',
        service_type: 1
    });

    const [errors, setErrors] = useState({})

    // Сброс формы при открытии/закрытии модального окна
    useEffect(() => {
        if (isOpen) {
            setFormData({
                service_name: '',
                company_id: 1,
                status: 1,
                service_start_date: '',
                service_end_date: '',
                service_type: 1
            });
            setErrors({});
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Валидация company_id (≥ 1)
        if (Number(formData.company_id) < 1) {
            newErrors.company_id = 'Компания не существует';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await onSave(formData);
            setFormData({
                service_name: '',
                company_id: 1,
                status: 1,
                service_start_date: '',
                service_end_date: '',
                service_type: 1
            });
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении компании:', error);
        }
    };

    const handleClose = () => {
        setFormData({
            service_name: '',
            company_id: 1,
            status: 1,
            service_start_date: '',
            service_end_date: '',
            service_type: 1
        });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Добавить сервис</h2>
                <form onSubmit={handleSubmit}>
                    <div onSubmit={handleSubmit} className="form-group">
                        <label htmlFor="service_name">Название</label>
                        <Input
                            type="text"
                            id="service_name"
                            name="service_name"
                            value={formData.service_name}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.inn && <span className="error-message">{errors.inn}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="company_id">Компания</label>
                        <Input
                            type="number"
                            id="company_id"
                            name="company_id"
                            value={formData.company_id}
                            onChange={handleInputChange}
                            required
                            min="1"
                        />
                        {errors.status && <span className="error-message">{errors.status}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_start_date">Дата начала</label>
                        <Input
                            type="date"
                            id="service_start_date"
                            name="service_start_date"
                            value={formData.service_start_date}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.status && <span className="error-message">{errors.status}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_end_date">Дата окончания</label>
                        <Input
                            type="date"
                            id="service_end_date"
                            name="service_end_date"
                            value={formData.service_end_date}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.status && <span className="error-message">{errors.status}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="service_type">Тип</label>
                        <Input
                            type="number"
                            id="service_type"
                            name="service_type"
                            value={formData.service_type}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.status && <span className="error-message">{errors.status}</span>}
                    </div>
                    <div className="modal-actions">
                        <RedBtn type="button" id="cancelBtn" onClick={handleClose}>Отмена</RedBtn>
                        <GreenBtn type="submit">Сохранить</GreenBtn>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServicesModal;