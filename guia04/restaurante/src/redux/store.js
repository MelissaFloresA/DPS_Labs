import { configureStore } from '@reduxjs/toolkit';
import mesasReducer from './mesasSlice';
import menuReducer from './menuSlice';
import pedidosReducer from './pedidosSlice';

export const store = configureStore({
  reducer: {
    mesas: mesasReducer,
    menu: menuReducer,
    pedidos: pedidosReducer
  }
});