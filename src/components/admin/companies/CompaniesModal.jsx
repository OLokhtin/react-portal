import React, {useEffect, useState} from 'react';
import '../AdminModal.css'
import Input from "../../input/Input";
import RedBtn from "../../button/RedBtn";
import GreenBtn from "../../button/GreenBtn";

const CompaniesModal = ({isOpen, onClose, onSave}) => {
    const [formData, setFormData] = useState({
        company_name: '',
        inn: '',
        status: 1
    });

    const [errors, setErrors] = useState({})

    // Сброс формы при открытии/закрытии модального окна
    useEffect(() => {
        if (isOpen) {
            setFormData({ company_name: '', inn: '', status: 1 });
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

        // Валидация ИНН (9-11 символов)
        if (formData.inn.length < 9 || formData.inn.length > 11) {
            newErrors.inn = 'ИНН должен содержать от 9 до 11 символов';
        }

        // Валидация статуса (≥ 1)
        if (Number(formData.status) < 1) {
            newErrors.status = 'Статус должен быть не менее 1';
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
            setFormData({ company_name: '', inn: '', status: 1 });
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении компании:', error);
        }
    };

    const handleClose = () => {
        setFormData({ company_name: '', inn: '', status: 1 });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Добавить компанию</h2>
                <form onSubmit={handleSubmit}>
                    <div onSubmit={handleSubmit} className="form-group">
                        <label htmlFor="company_name">Название</label>
                        <Input
                            type="text"
                            id="company_name"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inn">ИНН</label>
                        <Input
                            type="text"
                            id="inn"
                            name="inn"
                            value={formData.inn}
                            onChange={handleInputChange}
                            required
                            minLength={9}
                            maxLength={11}
                            pattern="[0-9]{9,11}"
                            title="ИНН должен содержать от 9 до 11 цифр"
                        />
                        {errors.inn && <span className="error-message">{errors.inn}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Статус</label>
                        <Input
                            type="number"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                            min="1"
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

export default CompaniesModal;