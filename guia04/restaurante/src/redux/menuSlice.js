import { createSlice } from '@reduxjs/toolkit';
import menuData from '../datos/menuData';

const initialState = menuData;

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {}
});

export default menuSlice.reducer;