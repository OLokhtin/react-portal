import React, {useState} from 'react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Ошибка при сохранении компании:', error);
        }
    };

    const handleClose = () => {
        setFormData({
            service_name: '',
            company_id: 1,
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
                            min="1"
                        />
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