'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ocuparMesa, liberarMesa } from '../redux/mesasSlice';
import FormularioPedido from './FormularioPedido';

const ListaMesas = () => {
  const mesas = useSelector(state => state.mesas);
  const dispatch = useDispatch();
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const manejarSeleccionMesa = (mesa) => {
    if (mesa.estado === 'disponible') {
      dispatch(ocuparMesa(mesa.id));
      setMesaSeleccionada(mesa.id);
    }
  };

  const liberarMesaHandler = (mesaId) => {
    dispatch(liberarMesa(mesaId));
    setMesaSeleccionada(null);
  };

  return (
    <div className="contenedorMesas">
      <h2>Mesas del Restaurante</h2>
      <div className="gridMesas">
        {mesas.map(mesa => (
          <div 
            key={mesa.id} 
            className={`mesa ${mesa.estado}`}
            onClick={() => manejarSeleccionMesa(mesa)}
          >
            <h3>{mesa.nombre}</h3>
            <p>Estado: {mesa.estado}</p>
            {mesa.estado === 'ocupada' && mesaSeleccionada === mesa.id && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  liberarMesaHandler(mesa.id);
                }}
                className="botonLiberar"
              > Cancelar
              </button>
            )}
          </div>
        ))}
      </div>
      
      {mesaSeleccionada && (
        <FormularioPedido mesaId={mesaSeleccionada} />
      )}
    </div>
  );
};

export default ListaMesas;