'use client';
import React from 'react';

const opcionesEstado = [
  { valor: 'pendiente', texto: 'Pendiente' },
  { valor: 'preparacion', texto: 'En preparación' },
  { valor: 'listo', texto: 'Listo para servir' },
  { valor: 'servido', texto: 'Servido' }
];

const EstadoPedido = ({ estado, onChange }) => {
  return (
    <div className="estadoPedido">
      <label>Estado:</label>
      <select 
        value={estado} 
        onChange={(e) => onChange(e.target.value)}
        className="selectorEstado"
      >
        {opcionesEstado.map(opcion => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EstadoPedido;