'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cambiarEstado, eliminarPedido, modificarPedido } from '../redux/pedidosSlice';
import { liberarMesa } from '../redux/mesasSlice';
import EstadoPedido from './EstadoPedido';
import FormularioPedido from './FormularioPedido';

const ListaPedidos = () => {
  const pedidos = useSelector(state => state.pedidos);
  const mesas = useSelector(state => state.mesas);
  const dispatch = useDispatch();
  const [pedidoEditando, setPedidoEditando] = useState(null);

  const obtenerNombreMesa = (mesaId) => {
    const mesa = mesas.find(m => m.id === mesaId);
    return mesa ? mesa.nombre : 'Mesa desconocida';
  };

  const manejarCambioEstado = (pedido, nuevoEstado) => {
    dispatch(cambiarEstado({ idPedido: pedido.id, nuevoEstado }));
    
    if (nuevoEstado === 'servido') {
      dispatch(liberarMesa(pedido.mesaId));
    }
  };

  const guardarModificacion = (pedidoActualizado) => {
    dispatch(modificarPedido({
      idPedido: pedidoEditando.id,
      items: pedidoActualizado.items,
      comentarios: pedidoActualizado.comentarios
    }));
    setPedidoEditando(null);
  };

  return (
    <div className="lista-pedidos">
      <h2>Pedidos Activos</h2>
      
      {pedidoEditando ? (
        <div className="edicion-pedido">
          <h3>Editando Pedido - Mesa {pedidoEditando.mesaId}</h3> 
          <FormularioPedido 
            mesaId={pedidoEditando.mesaId}
            pedidoExistente={pedidoEditando}
            onGuardar={guardarModificacion}
            onCancelar={() => setPedidoEditando(null)}
          />
        </div>
      ) : (
        <>
          {pedidos.length === 0 ? (
            <p>No hay pedidos activos</p> /*inicia listado de pedidos en cards*/
          ) : (
            <div className="grid-pedidos">
              {pedidos.map(pedido => (
                <div key={pedido.id} className="tarjeta-pedido">
                  <h3>Mesa: {obtenerNombreMesa(pedido.mesaId)}</h3>
                  <p>Hora: {new Date(pedido.fecha).toLocaleTimeString()}</p>
                  
                  <ul>
                    {pedido.items.map((item, index) => (
                      <li key={index}>
                        {item.nombre} - ${item.precio.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                  
                  {pedido.comentarios && (
                    <p className="comentarios">Notas: {pedido.comentarios}</p>
                  )}
                  
                  <EstadoPedido 
                    estado={pedido.estado} 
                    onChange={(nuevoEstado) => manejarCambioEstado(pedido, nuevoEstado)}
                  />
                  
                  <div className="acciones-pedido">
                    <button 
                      onClick={() => setPedidoEditando(pedido)}
                      className="boton-modificar"
                    >Modificar Pedido
                    </button>
                    <button 
                      onClick={() => dispatch(eliminarPedido(pedido.id))}
                      className="boton-eliminar"
                    >Eliminar Pedido
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListaPedidos;