import React, { useState } from 'react'
import styles from "../page.module.css";

const ItemCompra = ({ item, index, deleteItem, updateItem}) => {
    return (
        <>
            <div className={styles.list}>
                <h3 className={styles.titulo}>{item.producto} - {item.marca}</h3>
                <p>Cantidad: {item.cantidad} | Precio unitario: ${item.precio}</p>
                <p>Subtotal: ${item.cantidad * item.precio}</p>
                <button className={styles.btn_delete} onClick={() => deleteItem(index)}>Eliminar</button>
                <button className={styles.btn_update} onClick={() => updateItem(index)}>Editar</button>
            </div>
        </>
    )
}

export default ItemCompra