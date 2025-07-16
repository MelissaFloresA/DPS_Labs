import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    agregarPedido: (state, action) => {
      state.push(action.payload);
    },
    modificarPedido: (state, action) => {
      const { idPedido, items, comentarios } = action.payload;
      const pedido = state.find(p => p.id === idPedido);
      if (pedido) {
        pedido.items = items;
        pedido.comentarios = comentarios;
      }
    },
    cambiarEstado: (state, action) => {
      const { idPedido, nuevoEstado } = action.payload;
      const pedido = state.find(p => p.id === idPedido);
      if (pedido) pedido.estado = nuevoEstado;
    },
    eliminarPedido: (state, action) => {
      return state.filter(pedido => pedido.id !== action.payload);
    }
  }
});

export const { agregarPedido, modificarPedido, cambiarEstado, eliminarPedido } = pedidosSlice.actions;
export default pedidosSlice.reducer;