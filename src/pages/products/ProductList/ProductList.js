import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(respuesta => respuesta.json())
      .then(datos => {
        setProducts(datos); 
        setLoading(false);  
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(producto =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-product-list">
      <header className="admin-header">
        <h1 className="admin-title">Productos</h1>

        <div className="admin-header-actions">
          <div className="search-container">
            <span className="search-icon"></span>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>

          <Link to="/products/new" className="action-btn primary add-btn">
            Agregar Producto
          </Link>
        </div>
      </header>

      <main className="admin-content">
        {loading ? (
          <div className="loading-state">
            <span className="spinner"></span>
            <p>Cargando datos desde la API...</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(producto => (
                <Link key={producto.id} to={`/products/${producto.id}`} className="admin-product-card">
                  <div className="card-image-container">

                    <img
                      src={producto.img || '/img/default-fallback.png'}
                      alt={producto.nombre}
                    />
                  </div>
                  <div className="card-info" style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: '1' }}>
  <span className="product-id">#{producto.id}</span>
  <h3 className="card-title" style={{ margin: '5px 0' }}>{producto.nombre}</h3>
  <p className="product-description">{producto.categoria || 'Sin descripción'}</p>
  
  <div className="card-footer">
    <span className="price">$ {producto.precio.toLocaleString('es-AR')}</span>
    <span className="stock">Stock: {producto.stock}</span>
  </div>
</div>
                </Link>
              ))
            ) : (
              <div className="no-results">
                <p>No se encontraron productos que coincidan con la busqueda.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
export default ProductList;
