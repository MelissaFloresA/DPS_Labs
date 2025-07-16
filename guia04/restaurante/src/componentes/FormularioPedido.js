'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { agregarPedido } from '../redux/pedidosSlice';

const FormularioPedido = ({ mesaId, pedidoExistente, onGuardar, onCancelar }) => {
  const menu = useSelector(state => state.menu);
  const dispatch = useDispatch();
  const [pedido, setPedido] = useState([]);
  const [comentarios, setComentarios] = useState('');

  useEffect(() => {
    if (pedidoExistente) {
      setPedido([...pedidoExistente.items]);
      setComentarios(pedidoExistente.comentarios || '');
    }
  }, [pedidoExistente]);

  const agregarAlPedido = (item) => {
    setPedido([...pedido, { ...item, idUnico: Date.now() }]);
  };

  const eliminarDelPedido = (idUnico) => {
    setPedido(pedido.filter(item => item.idUnico !== idUnico));
  };

  const enviarPedido = () => {
    if (pedido.length === 0) return;
    
    if (pedidoExistente) {
      // Edición de pedido
      onGuardar({
        items: pedido,
        comentarios
      });
    } else {
      // Nuevo pedido
      const nuevoPedido = {
        id: Date.now(),
        mesaId,
        items: pedido,
        estado: 'pendiente',
        comentarios,
        fecha: new Date().toISOString()
      };
      
      dispatch(agregarPedido(nuevoPedido));
      setPedido([]);
      setComentarios('');
    }
  };

  return (
    <div className="formulario-pedido">
      <h3>{pedidoExistente ? 'Modificar Pedido' : 'Nuevo Pedido'} - Mesa {mesaId}</h3>
      
      <div className="menu-disponible">
        <h4>Menú Disponible</h4>
        <div className="grid-menu">
          {menu.map(item => (
            <div key={item.id} className="item-menu" onClick={() => agregarAlPedido(item)}>
              <h5>{item.nombre}</h5>
              <p>${item.precio.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="resumen-pedido">
        <h4>Resumen del Pedido</h4>
        {pedido.length === 0 ? (
          <p>No hay items en el pedido</p>
        ) : (
          <ul>
            {pedido.map(item => (
              <li key={item.idUnico}>
                {item.nombre} - ${item.precio.toFixed(2)}
                <button onClick={() => eliminarDelPedido(item.idUnico)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )}
        
        <textarea
          placeholder="Comentarios especiales..."
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
        />
        
        <div className="acciones-formulario">
          {pedidoExistente && (
            <button onClick={onCancelar} className="boton-cancelar">
              Cancelar
            </button>
          )}
          <button 
            onClick={enviarPedido}
            disabled={pedido.length === 0}
            className="boton-enviar"
          >
            {pedidoExistente ? 'Guardar Cambios' : 'Enviar a Cocina'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioPedido;