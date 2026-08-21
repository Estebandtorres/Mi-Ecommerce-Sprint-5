import { Link } from 'react-router-dom';
import './home.css';
import React, { useState, useEffect } from 'react';

function Home() {
  const sessionData = {
    userName: "Administrador",
  };
  const [statsData, setStatsData] = useState({
    totalProducts: 0,
    totalCategories: 0
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/stats')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setStatsData(datos);
      })
      .catch(error => console.error('Error al cargar estadísticas:', error));
  }, []); 

  return (
    <div className="dashboard-home">
      
      <header className="dashboard-header">
        <h1>¡Hola {sessionData.userName}!</h1>
        <p>Bienvenido al Panel de Gestión. ¿Qué te gustaría hacer hoy?</p>
      </header>

      <div className="dashboard-modules">
        <section className="dashboard-module">
          <div className="module-header">
            <span className="module-icon">📦</span>
            <h2>Productos</h2>
          </div>
          
          <div className="module-kpi">
            <span className="kpi-number">{statsData.totalProducts}</span>
            <span className="kpi-label">Productos distintos</span>
          </div>
          
          <div className="module-actions">
            <Link to="/products" className="action-btn secondary">
              Ver Listado
            </Link>
            <Link to="/products/new" className="action-btn primary">
              Agregar Producto
            </Link>
          </div>
        </section>

        
      </div>
    </div>
  );
}

export default Home;