'use client';
import React, { useState, useRef, useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import products from '../data'; 
import '../styles/product-grid.css';
import '../styles/modal.css';



const ProductGrid = () => {
    const dispatch = useDispatch();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const modalRef = useRef();

    // Cerrar modal al hacer clic fuera del contenido
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setSelectedProduct(null);
            }
        };

        if (selectedProduct) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedProduct]);

    const closeModal = () => {
        setSelectedProduct(null);
    };


    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} onClick={() => setSelectedProduct(product)} />
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <button onClick={() => dispatch(addToCart(product))}>
                        Agregar al carrito
                    </button>
                </div>
            ))}

            {/*PARA MODAL*/}
          {selectedProduct && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalRef}>
                        <button 
                            className="modal-close"
                            onClick={closeModal}
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>
                        
                        <img 
                            src={selectedProduct.image} 
                            alt={selectedProduct.title}
                            className="modal-image"
                        />
                        
                        <div className="modal-body">
                            <h2>{selectedProduct.title}</h2>
                            <p className="modal-summary">{selectedProduct.summary}</p>
                            
                            <div className="modal-actions">
                                <button 
                                    className="btn btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cerrar
                                </button>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => {
                                        dispatch(addToCart(selectedProduct));
                                        closeModal();
                                    }}
                                >
                                    Añadir al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductGrid;