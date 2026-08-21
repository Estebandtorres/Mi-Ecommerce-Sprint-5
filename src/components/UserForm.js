import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        rol: 'cliente'
    });

    useEffect(() => {
        if (isEdit) {
            fetch(`http://localhost:3000/api/users/${id}`)
                .then(res => res.json())
                .then(data => setFormData({ ...data, password: '' })) // La contraseña no se retorna por seguridad
                .catch(err => console.error('Error al cargar usuario:', err));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEdit 
            ? `http://localhost:3000/api/users/${id}` 
            : 'http://localhost:3000/api/users';
        const method = isEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/users');
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Ocurrió un error al guardar');
            }
        } catch (error) {
            console.error('Error en el submit:', error);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>{isEdit ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '8px' }} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>
                        Contraseña {isEdit && '(dejar en blanco para mantener la actual)'}:
                    </label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required={!isEdit} style={{ width: '100%', padding: '8px' }} />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Rol:</label>
                    <select name="rol" value={formData.rol} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                        <option value="cliente">Cliente</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
                </button>
            </form>
        </div>
    );
}

export default UserForm;