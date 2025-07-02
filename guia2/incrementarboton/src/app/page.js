"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [contador, setContador] = useState(0);

  //funciones
  const incrementar = () => {
    setContador(contador + 1);
  };

  const decrementar = () => {
    setContador(contador - 1);
  };

  return (
    <div className={styles.page}>
      <h1>SUBE O BAJA</h1>
      <div className={styles.main}>
        <div className={styles.cont}>
          <label className={styles.contador}>{contador}</label>
        </div>
        <div>
          <button className={styles.button1} onClick={incrementar}>↑</button>
          <button className={styles.button2} onClick={decrementar}>↓</button>
        </div>
      </div>
    </div>
  );
}
