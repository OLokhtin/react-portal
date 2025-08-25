import React, {useState} from 'react';
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