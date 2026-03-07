import React from 'react';
import { Outlet } from 'react-router-dom'; // 1. Importe o Outlet
import Sidebar from './components/Sidebar';   // 2. Importe sua Sidebar
import './mainLayout.css';                   // Vamos criar um CSS para o layout

function MainLayout() {
  return (
    <div className="layout-container">
      <Sidebar /> {/* 3. Sua sidebar fica aqui, permanente */}

      <main className="page-content">
        <Outlet /> {/* 4. E aqui o conteúdo da página específica será renderizado */}
      </main>
    </div>
  );
}

export default MainLayout;