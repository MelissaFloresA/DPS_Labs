"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {

  const [num, setNum] = useState(0);
  const [tipo, setTipo] = useState('CaF');
  const [resultado, setResultado] = useState('');

  //funcion para convertir
  const convertir = () => {
    const numero = parseFloat(num);
    if (tipo === "CaF") { //celsiud a fa
      const convertido = (numero * 9/5 + 32);
      setResultado(convertido.toFixed(2) + ' °F');
    }
    else {  //fa a c
      const convertido = ((numero - 32) * 5/9);
      setResultado(convertido.toFixed(2) + ' °C');
    }
  }

  return (
    <div className={styles.page}>
      <h1>Conversor de Temperatura</h1>
      <div className={styles.main}>
        <label className={styles.text} >Escriba temperatura a convertir:</label>
        <input className={styles.inputT} type="number" value={num} onChange={(e) => setNum(e.target.value)}></input>
        <select className={styles.opciones} value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="CaF">°C a °F</option>
          <option value="FaC">°F a °C</option>
        </select>
        <button className={styles.boton} onClick={convertir}>CONVERTIR</button>

         {resultado && <div className={styles.text}>{resultado}</div>}
      </div>
    </div>
  );
}