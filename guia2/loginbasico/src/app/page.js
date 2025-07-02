"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

  //CREDENCIALES QUEMADAS
  const valores = {
    usuario: 'meli',
    contraseña: '123'
  };
  const [user, setUser] = useState('');
  const [contra, setContra] = useState('');
  //const [valido, setValido] = useState(false); como bandera
  const [mensaje, setMensaje] = useState('');

  const login = (e) => {
    e.preventDefault();
    if (user == valores.usuario && contra == valores.contraseña) {
      setMensaje('Logueado con éxito, BIENVENIDO');
    }
    else {
      setMensaje('Credenciales incorrectas');
    }
  }

  return (
    <div className={styles.page}>
      <h1>LOGIN</h1>

      <form onSubmit={login}>
        <div className={styles.contenedor}>
          <label className={styles.label}>
            Usuario:
            <input className={styles.input} type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
          </label>
        </div>

        <div className={styles.contenedor}>
          <label className={styles.label}>
            Contraseña:
            <input className={styles.input} type="password" value={contra} onChange={(e) => setContra(e.target.value)} required />
          </label>
        </div>

        <div className={styles.contB}>
          <button className={styles.boton} type="submit">Iniciar sesión</button>
          <p>{mensaje}</p>
        </div>
      </form>

    </div>
  );
}
