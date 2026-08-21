import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            const data = await response.json();
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id, nombre) => {
        if (window.confirm(`¿Seguro que deseas eliminar al usuario ${nombre}?`)) {
            try {
                const res = await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    setUsers(users.filter(u => u.id !== id));
                }
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    const filteredUsers = users.filter(u => 
        `${u.nombre} ${u.apellido} ${u.email}`.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>Gestión de Usuarios</h2>
                <Link to="/users/new" className="btn btn-primary" style={{ padding: '8px 16px', background: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
                    + Nuevo Usuario
                </Link>
            </div>

            <input 
                type="text" 
                placeholder="Buscar por nombre, apellido o email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing: 'border-box' }}
            />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#0c0c0c', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '2px solid #b60909' }}>ID</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #9c0505' }}>Nombre Completo</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #ac0707' }}>Email</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #a70909' }}>Rol</th>
                        <th style={{ padding: '10px', borderBottom: '2px solid #910000' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr><td colSpan="5" style={{ padding: '15px', textAlign: 'center' }}>No se encontraron usuarios.</td></tr>
                    ) : (
                        filteredUsers.map(user => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #940202' }}>
                                <td style={{ padding: '10px' }}>{user.id}</td>
                                <td style={{ padding: '10px' }}>{user.nombre} {user.apellido}</td>
                                <td style={{ padding: '10px' }}>{user.email}</td>
                                <td style={{ padding: '10px' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: user.rol === 'admin' ? '#00eb37' : '#004ce4' }}>
                                        {user.rol}
                                    </span>
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <Link to={`/users/edit/${user.id}`} style={{ marginRight: '10px', color: '#007bff' }}>
                                        Editar
                                    </Link>
                                    <button onClick={() => handleDelete(user.id, user.nombre)} style={{ color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;