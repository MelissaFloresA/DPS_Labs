'use client';
import { createSlice } from '@reduxjs/toolkit';
const initialState = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        },
        removeFromCart: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        clearCart: () => {
            return []; // Devuelve un array vacío para vaciar el carrito
        }
    },
});
export const { addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
