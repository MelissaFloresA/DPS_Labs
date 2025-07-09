import { useState } from 'react';
import styles from '../page.module.css';

export default function Tabs({ planeta }) {
  const [tabActiva, setTabActiva] = useState('info');

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsHeader}>
        <button 
          className={tabActiva === 'info' ? styles.tabActive : ''}
          onClick={() => setTabActiva('info')}
        >
          Información
        </button>
        <button 
          className={tabActiva === 'datos' ? styles.tabActive : ''}
          onClick={() => setTabActiva('datos')}
        >
          Datos Técnicos
        </button>
      </div>
      
      <div className={styles.tabsContent}>
        {tabActiva === 'info' && (
          <div>
            <h2>{planeta.nombre}</h2>
            <p>{planeta.descripcion}</p>
          </div>
        )}
        
        {tabActiva === 'datos' && (
          <div className={styles.datosGrid}>
            <div>
              <h3>Masa</h3>
              <p>{planeta.masa}</p>
            </div>
            <div>
              <h3>Distancia al Sol</h3>
              <p>{planeta.distancia}</p>
            </div>
            <div>
              <h3>Temperatura</h3>
              <p>{planeta.temperatura}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}