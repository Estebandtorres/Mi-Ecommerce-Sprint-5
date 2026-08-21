import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductView.css';

const linkApi = 'http://localhost:3000/api';

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productoOriginal, setProductoOriginal] = useState(null);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    tienda: '',
    img: ''
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const respuesta = await fetch(`${linkApi}/products/${id}`);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setProductoOriginal(datos);
          
          setDatosFormulario({
            ...datos,
            precio: datos.precio ? parseInt(datos.precio, 10) : 0,
            stock: datos.stock ? parseInt(datos.stock, 10) : 0,
            descripcion: datos.descripcion || ''
          });
        } else {
          setProductoOriginal(null);
        }
      } catch (error) {
        console.error("Error al cargar el producto desde la API:", error);
      } finally {
        setCargando(false);
      }
    };
    
    cargarProducto();
  }, [id]);

  if (cargando) {
    return <div className="loading" style={{ color: 'white', padding: '40px' }}>Cargando información...</div>;
  }

  if (!productoOriginal) {
    return (
      <div className="product-view not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe en la API.</p>
        <Link to="/products" className="back-link">Volver al listado</Link>
      </div>
    );
  }

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    
    let valorProcesado = value;
    
    if (name === 'precio' || name === 'stock') {
      valorProcesado = value === '' ? 0 : parseInt(value, 10);
      if (isNaN(valorProcesado)) valorProcesado = 0;
    }

    setDatosFormulario({ ...datosFormulario, [name]: valorProcesado });
  };

  const cambiarStock = (cantidad) => {
    setDatosFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      stock: Math.max(0, parseInt(estadoAnterior.stock || 0) + cantidad)
    }));
  };

  const cancelarEdicion = () => {
    setDatosFormulario({
      ...productoOriginal,
      precio: parseInt(productoOriginal.precio, 10) || 0,
      stock: parseInt(productoOriginal.stock, 10) || 0
    });
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    
    const datosAEnviar = {
      ...datosFormulario,
      precio: parseInt(datosFormulario.precio, 10) || 0,
      stock: parseInt(datosFormulario.stock, 10) || 0,
      imagen: datosFormulario.img || productoOriginal.img || productoOriginal.imagen
    };

    try {
      await fetch(`${linkApi}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosAEnviar)
      });
      
      setProductoOriginal(datosAEnviar);
      alert("¡Cambios guardados exitosamente!");
    } catch (error) {
      console.error('Error al guardar:', error);
    }
  };
  const manejarEliminar = async () => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`${linkApi}/products/${id}`, {
        method: 'DELETE',
      });

      if (respuesta.ok || respuesta.status === 204) {
        alert("¡Producto eliminado exitosamente!");
        navigate('/products');
      } else {
        alert("Hubo un error al intentar eliminar el producto.");
      }
    } catch (error) {
      console.error("Error de red al eliminar:", error);
      alert("No se pudo conectar con el servidor backend.");
    }
  };

  return (
    <div className="product-view">
      <div className="product-view-card">
        
        <div className="product-view-header-top">
          <div className="breadcrumb-title">
            <Link to="/products" className="breadcrumb-link">Productos</Link> &gt; #{id}
          </div>
          {/* CORREGIDO: Apunta a manejarEliminar en lugar de eliminarProducto */}
          <button onClick={manejarEliminar} className="top-delete-btn">Eliminar</button>
        </div>
        
        <div className="product-view-main" style={{ marginTop: '30px' }}>
          <div className="product-view-image" style={{ minHeight: '150px', width: '150px' }}>
            <img src={productoOriginal.img || '/img/default-fallback.png'} alt={productoOriginal.nombre} style={{ borderRadius: '16px' }} />
          </div>

          <div className="product-view-details">
            <h2>{productoOriginal.nombre}</h2>
            <div className="product-view-meta">
              <span className="product-view-price">${productoOriginal.precio}</span>
              <span className="product-view-stock">{productoOriginal.stock} STOCK DISPONIBLE</span>
              {productoOriginal.tienda && (
                <span className="product-view-stock badge-tienda">👤 {productoOriginal.tienda}</span>
              )}
            </div>
          </div>
        </div>

        <div className="edit-section">
          <h3>Información</h3>
          <form className="edit-form" onSubmit={guardarCambios}>
            
            <div className="form-group">
              <label>Nombre</label>
              <input 
                type="text" 
                name="nombre" 
                value={datosFormulario.nombre} 
                onChange={manejarCambioInput} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Valor</label>
              <input 
                type="number" 
                name="precio" 
                value={datosFormulario.precio} 
                onChange={manejarCambioInput} 
                step="1"
                min="0"
                required 
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <div className="stock-control">
                <button type="button" onClick={() => cambiarStock(-1)} className="btn-stock">➖</button>
                <input 
                  type="number" 
                  name="stock" 
                  value={datosFormulario.stock} 
                  onChange={manejarCambioInput} 
                  step="1"
                  min="0"
                  required
                />
                <button type="button" onClick={() => cambiarStock(1)} className="btn-stock">➕</button>
              </div>
            </div>

            <div className="form-group">
              <label>Descripción</label>
              <textarea 
                name="descripcion" 
                value={datosFormulario.descripcion} 
                onChange={manejarCambioInput} 
                rows="5"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" onClick={cancelarEdicion} className="action-btn secondary">Cancelar</button>
              <button type="submit" className="action-btn primary">Guardar</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ProductView;
