import React, { useState } from 'react';

const Formulario = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        direccion: '',
        telefono: '',
        email: '',
        plato_principal: '',
        bebida: '',
        postre: '',
        instrucciones_especiales: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost/api/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({
                    nombres: '',
                    apellidos: '',
                    direccion: '',
                    telefono: '',
                    email: '',
                    plato_principal: '',
                    bebida: '',
                    postre: '',
                    instrucciones_especiales: ''
                });
                alert('Pedido enviado correctamente');
            } else {
                alert('Error al enviar el pedido');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al enviar el pedido');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2 className="form-title">Realiza tu Pedido</h2>

            <div className="form-group">
                <label htmlFor="nombres">Nombres</label>
                <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="direccion">Dirección de Entrega</label>
                <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-input"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="plato_principal">Plato Principal</label>
                <select
                    id="plato_principal"
                    name="plato_principal"
                    value={formData.plato_principal}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="">Seleccione un plato</option>
                    <option value="lomo_saltado">Lomo Saltado</option>
                    <option value="ceviche">Ceviche</option>
                    <option value="aji_gallina">Ají de Gallina</option>
                    <option value="arroz_chaufa">Arroz Chaufa</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="bebida">Bebida</label>
                <select
                    id="bebida"
                    name="bebida"
                    value={formData.bebida}
                    onChange={handleChange}
                    className="form-select"
                    required
                >
                    <option value="">Seleccione una bebida</option>
                    <option value="chicha_morada">Chicha Morada</option>
                    <option value="inca_kola">Inca Kola</option>
                    <option value="limonada">Limonada</option>
                    <option value="agua">Agua</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="postre">Postre</label>
                <select
                    id="postre"
                    name="postre"
                    value={formData.postre}
                    onChange={handleChange}
                    className="form-select"
                >
                    <option value="">Seleccione un postre (opcional)</option>
                    <option value="suspiro">Suspiro a la Limeña</option>
                    <option value="tres_leches">Tres Leches</option>
                    <option value="picarones">Picarones</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="instrucciones_especiales">Instrucciones Especiales</label>
                <textarea
                    id="instrucciones_especiales"
                    name="instrucciones_especiales"
                    value={formData.instrucciones_especiales}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Especificaciones adicionales, alergias, etc."
                />
            </div>

            <button type="submit" className="submit-button">
                Enviar Pedido
            </button>
        </form>
    );
};

export default Formulario;