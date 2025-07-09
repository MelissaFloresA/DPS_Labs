"use client"
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Carrusel from './components/Carrusel';
import Tabs from './components/Tabs';

function Page() {
  const [planetas, setPlanetas] = useState([]);
  const [planetaSeleccionado, setPlanetaSeleccionado] = useState(null);

  useEffect(() => {
    fetch('/datos.json')
      .then(res => res.json())
      .then(datos => {
        setPlanetas(datos.planetas);
        setPlanetaSeleccionado(datos.planetas[0]);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1>Planetas del Sistema Solar</h1>
      
      <Carrusel 
        planetas={planetas}
        planetaSeleccionado={planetaSeleccionado}
        onSelectPlaneta={setPlanetaSeleccionado}
      />
      
      {planetaSeleccionado && (
        <Tabs planeta={planetaSeleccionado} />
      )}
    </div>
  );
}

export default Page;