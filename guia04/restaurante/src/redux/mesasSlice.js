import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, nombre: 'Ahuachapán', estado: 'disponible' },
  { id: 2, nombre: 'Santa Ana', estado: 'disponible' },
  { id: 3, nombre: 'Sonsonate', estado: 'disponible' },
  { id: 4, nombre: 'La Libertad', estado: 'disponible' },
  { id: 5, nombre: 'San Salvador', estado: 'disponible' },
  { id: 6, nombre: 'Cuscatlán', estado: 'disponible' },
  { id: 7, nombre: 'La Paz', estado: 'disponible' },
  { id: 8, nombre: 'Cabañas', estado: 'disponible' },
  { id: 9, nombre: 'San Vicente', estado: 'disponible' },
  { id: 10, nombre: 'Usulután', estado: 'disponible' },
  { id: 11, nombre: 'San Miguel', estado: 'disponible' },
  { id: 12, nombre: 'Morazán', estado: 'disponible' },
  { id: 13, nombre: 'La Unión', estado: 'disponible' },
  { id: 14, nombre: 'Chalatenango', estado: 'disponible' }
];

export const mesasSlice = createSlice({
  name: 'mesas',
  initialState,
  reducers: {
    ocuparMesa: (state, action) => {
      const mesa = state.find(m => m.id === action.payload);
      if (mesa) mesa.estado = 'ocupada';
    },
    liberarMesa: (state, action) => {
      const mesa = state.find(m => m.id === action.payload);
      if (mesa) mesa.estado = 'disponible';
    }
  }
});

export const { ocuparMesa, liberarMesa } = mesasSlice.actions;
export default mesasSlice.reducer;