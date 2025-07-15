'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Agregamos useDispatch
import { removeFromCart,clearCart } from '../redux/cartSlice'; // Importamos la acción
import '../styles/navbar.css';

const Navbar = () => {
    const [showCart, setShowCart] = useState(false);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch(); // Obtenemos la función dispatch
    
    return (
        <nav className="navbar">
            <h1>Mi Tienda</h1>
            <button className="cart-button" onClick={() => setShowCart(!showCart)}>
                🛒 Carrito ({cart.length})
            </button>
            {showCart && (
                <div className="cart-dropdown">
                    {cart.length === 0 ? (
                        <p className="cart-item">El carrito está vacío</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} width='50px'></img> 
                                <p>{item.title} - ${item.price}</p>
                                <button onClick={() => dispatch(removeFromCart(item.id))}>  X  </button>
                            </div>
                        ))
                    )}
                <button onClick={() => dispatch(clearCart())}>Vaciar Carrito</button>
                </div>
               
            )}
        </nav>
    );
};

export default Navbar;