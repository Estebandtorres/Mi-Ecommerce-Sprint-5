import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import MainMenu from './components/MainMenu/MainMenu';

import Home from './pages/home/home.js';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ProductsList from './pages/products/ProductList/ProductList.js';
import ProductView from './pages/products/productsView/ProductView.js';
import ProductNew from './pages/products/ProductNew/ProductNew.js';
import CategoriesView from './pages/products/Categories/CategorieList/CategorieList.js';


const ProfileView = () => <div className="contenedor"><h2>👤 Perfil de Usuario</h2><p>Datos de la cuenta.</p></div>;
const NotFound = () => <div className="contenedor"><h2>404 - Página no encontrada</h2></div>;
const CategoryForm = () => <div className="contenedor"><h2>➕ Módulo: Registrar/Modificar Categoría</h2></div>;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app-layout">

        <MainMenu
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          closeMenu={closeSidebar}
        />

        {/* MAIN AREA */}
        <main className="main-area">
          <header className="main-header">
            <button className="menu-btn d-mobile" onClick={toggleSidebar}>☰</button>
            <h2 className="header-title">Panel de Gestión</h2>
          </header>

          <div className="content-area">
            <Routes>
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/new" element={<UserForm />} />
                  <Route path="/users/edit/:id" element={<UserForm />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductsList />} />
                  <Route path="/products/new" element={<ProductNew />} />
                  <Route path="/products/:id" element={<ProductView />} />
                  <Route path="/categories" element={<CategoriesView />} />
                  <Route path="/categories/new" element={<CategoryForm />} />
                  <Route path="/profile" element={<ProfileView />} />
                  <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
