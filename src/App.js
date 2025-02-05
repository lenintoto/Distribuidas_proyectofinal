import React from 'react';
import Formulario from './components/Formulario';
import './styles.css';

function App() {
  return (
    <div className="App">
      <header className="hero">
        <h1>El Sabor Peruano</h1>
        <p>Descubre la auténtica experiencia gastronómica peruana</p>
        <p className="instance-id">Instancia: {process.env.REACT_APP_INSTANCE_ID}</p>
      </header>
      
      <div className="content">
        <div className="features-grid">
          <div className="feature-card">
            <h3>Cocina Tradicional</h3>
            <p>Nuestros chefs expertos preparan los platos más emblemáticos de la gastronomía peruana con ingredientes frescos y auténticos.</p>
          </div>
          
          <div className="feature-card">
            <h3>Servicio Premium</h3>
            <p>Disfruta de una atención personalizada y un ambiente acogedor en cada visita a nuestro restaurante.</p>
          </div>
          
          <div className="feature-card">
            <h3>Delivery Rápido</h3>
            <p>Llevamos nuestros deliciosos platos directamente a tu puerta para que disfrutes de la mejor comida peruana en casa.</p>
          </div>
        </div>

        <Formulario />
      </div>
    </div>
  );
}

export default App;