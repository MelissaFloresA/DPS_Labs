"use client"
import { useState, useEffect } from 'react';
import estilos from './page.module.css';
import Grafica from './components/Grafica';
import SelectorAno from './components/SelectorAño';

export default function Pagina() {
  const [datos, setDatos] = useState([]);
  const [anoSeleccionado, setAnoSeleccionado] = useState(2023);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setDatos(data.ventas);
        const anos = data.ventas.map(item => item.año);
        setAnoSeleccionado(Math.max(...anos));
      });
  }, []);

  useEffect(() => {
    if (datos.length > 0) {
      const ventasAno = datos.find(item => item.año === anoSeleccionado)?.meses || [];
      setVentasFiltradas(ventasAno);
    }
  }, [anoSeleccionado, datos]);

  return (
    <div className={estilos.pagina}>
      <h1 className={estilos.tituloPrincipal}>Reporte de Ventas Mensuales</h1>
      
      <SelectorAno 
        datos={datos}
        anoSeleccionado={anoSeleccionado}
        onSelectAno={setAnoSeleccionado}
      />
      
      <div className={estilos.contenedorGrafica}>
        <Grafica ventas={ventasFiltradas} año={anoSeleccionado} />
      </div>
    </div>
  );
}