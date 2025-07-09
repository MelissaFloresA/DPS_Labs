"use client"
import React, { useState } from 'react'
import ItemCompra from './ItemCompras'
import styles from "../page.module.css";

const FormCompras = () => {
    // nuevo item
    const [item, setItem] = useState({
        producto: '-',
        marca: '-',
        cantidad: 0,
        precio: 0
    })

    // lista de compras
    const [listaCompras, setListaCompras] = useState([])
    //para edicion
    const [edit, setEdit] = useState(null)

    // Manejar cambios en los inputs
    const handleChange = e => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: name === 'cantidad' || name === 'precio' ?
                (value === '' ? '' : Number(value)) :
                value
        })
    }

    // Agregar 
    const handleSubmit = e => {
        e.preventDefault()

        // validación
        if (!item.producto.trim()) {
            alert('El nombre del producto es requerido')
            return
        }

        if (item.precio <= 0) {
            alert('El precio debe ser mayor a 0')
            return
        }

        if (edit !== null) {
            // Editar producto existente y toda la lista
            const nuevaLista = [...listaCompras]
            nuevaLista[edit] = item
            setListaCompras(nuevaLista)
            setEdit(null)
        } else {
            // Agregar nuevo producto
            setListaCompras([...listaCompras, item])
        }

        // Resetear el formulario
        setItem({
            producto: '',
            marca: '',
            cantidad: 1,
            precio: 0
        })
    }

    // Eliminar ítem de la lista
    const deleteItem = index => {
        const nuevaLista = [...listaCompras]
        nuevaLista.splice(index, 1)
        setListaCompras(nuevaLista)
    }

    //EDITAR
    const updateItem = index => {
        const itemToEdit = listaCompras[index]
        setItem(itemToEdit)
        setEdit(index)
    }


    // Calcular el total de la compra
    const total = listaCompras.reduce(
        (sum, item) => sum + (item.cantidad * item.precio), 0
    )

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>{edit !== null ? 'Editar Producto' : 'Agregar Producto'}</h2>

                <label>Producto:</label>
                <input
                    type="text"
                    name="producto"
                    value={item.producto}
                    onChange={handleChange}
                    required
                />

                <label>Marca:</label>
                <input
                    type="text"
                    name="marca"
                    value={item.marca}
                    onChange={handleChange}
                />

                <label>Cantidad:</label>
                <input
                    type="number"
                    name="cantidad"
                    min="1"
                    value={item.cantidad}
                    onChange={handleChange}
                />

                <label>Precio unitario:</label>
                <input
                    type="number"
                    name="precio"
                    min="0"
                    step="0.01"
                    value={item.precio}
                    onChange={handleChange}
                    required
                />

                <button type="submit">  {edit !== null ? 'Actualizar' : 'Agregar'}</button>
                 {edit !== null && (
                    //boton de cancelar si esta editando
                    <button type="button" className={styles.cancelar} onClick={() => {
                        setItem({
                            producto: '',
                            marca: '',
                            cantidad: 1,
                            precio: 0
                        })
                        setEdit(null)
                    }}>
                        Cancelar
                    </button>
                )}
            </form>

            <div className={styles.lista}>
                <h2>Lista de Compras</h2>
                {listaCompras.length === 0 ? (
                    <p>No hay productos en la lista</p>
                ) : (
                    <>
                        {listaCompras.map((item, index) => (
                            <ItemCompra
                                key={index}
                                item={item}
                                index={index}
                                deleteItem={deleteItem}
                                updateItem={updateItem}
                            />
                        ))}
                        <div className={styles.total}>
                            <h3>Total de la compra: ${total.toFixed(2)}</h3>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default FormCompras