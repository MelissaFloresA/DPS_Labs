"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [lenguajeSeleccionado, setLenguajeSeleccionado] = useState(null);

  const lenguajeData = [
    {
      "id": 1,
      "nombre": "Python",
      "descripcion": "Python este lenguaje es de código abierto, muy popular entre los desarrolladores de software, ya que funciona bien como lenguaje de scripting.",
      "casosDeUso": "Ciencia de datos, Automatización, Aplicaciones de aprendizaje profundo.",
      "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD51V9svKoLm3yrdSz8Yg9NH_TiuwYIO4CmQ&s"
    },
    {
      "id": 2,
      "nombre": "C#",
      "descripcion": "C# es un lenguaje de programación orientado a objetos, un modelo que organiza el diseño del software en torno a objetos.",
      "casosDeUso": "Aplicaciones web. Aplicaciones móviles. Desarrollo de juegos y RV. Aplicaciones para Linux y Mac.",
      "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv5PlR-6YZDHZIW8Axyo7AoQP7tTPyotHhEQ&s"
    },
    {
      "id": 3,
      "nombre": "C++",
      "descripcion": "Su naturaleza rápida y potente permite a los desarrolladores crear aplicaciones con un rendimiento excelente, como videojuegos, software gráfico y navegadores web.",
      "casosDeUso": "Programas informáticos. Sistemas operativos. Desarrollo de aplicaciones móviles. Desarrollo de videojuegos.",
      "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcF0zk3ZasUVMpdbyb8PwtgI0ZbzLCtu992SRP7nh5voMJQrcTyQ9zcOvU2Sq0wf0XUU4&usqp=CAU"
    },
    {
      "id": 4,
      "nombre": "JavaScript",
      "descripcion": "JavaScript, además de HTML y CSS, es el mejor lenguaje de programación que se puede aprender para el desarrollo del front-end de la web. El 97,8% de todas las páginas web utilizan JavaScript para sus scripts del lado del cliente, lo que lo convierte en el lenguaje más popular para la causa.",
      "casosDeUso": "Desarrollo web front-end. Desarrollo de juegos. Aplicaciones web.",
      "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRss-86vRuxOArrVRmMgerLZ5pi8yCs6U7zsQ&s"
    },
    {
      "id": 5,
      "nombre": "PHP",
      "descripcion": "PHP es uno de los primeros lenguajes de back-end que muchos desarrolladores web consideran esencial aprender. Además, el 78,1% de los sitios web utilizan PHP, ya que es el lenguaje principal de WordPress.",
      "casosDeUso": "Desarrollo web. Aplicaciones de escritorio. Programas informáticos.",
      "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsxNG_lXLHsCE3WEFJFyV8goRMlQ80y3eKPg&s"
    },
    {
      "id": 6,
      "nombre": "Java",
      "descripcion": "Java es un lenguaje de programación propietario de Oracle. Es un lenguaje de programación de alto nivel y de propósito general que permite a los programadores crear todo tipo de aplicaciones con facilidad.",
      "casosDeUso": "Desarrollo de móviles. Desarrollo de aplicaciones. Aplicaciones de escritorio. Aplicaciones web. Desarrollo de juegos.",
      "imagen": "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png"
    },
    {
      "id": 7,
      "nombre": "Swift",
      "descripcion": "Swift es uno de los lenguajes de programación más recientes del mercado actual. Cuando se lanzó, Swift era una alternativa a Objective-C, el lenguaje principal de los productos de Apple.",
      "casosDeUso": "Desarrollo de software, especialmente para aplicaciones de macOS e iOS",
      "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GIgqBO31G0Exx_R6l7miCVx_Q-ubWzqaEg&s"
    },
     {
      "id": 8,
      "nombre": "HTML",
      "descripcion": "HTML es la sigla del inglés HyperText Markup Language (lenguaje de marcado de hipertexto) y refiere al lenguaje de marcado para la elaboración de páginas web.",
      "casosDeUso": "Se limita a crear y estructurar texto en un sitio. Aspectos tales como las secciones, los encabezados, enlaces y párrafos",
      "imagen": "https://kinsta.com/wp-content/uploads/2021/03/HTML-5-Badge-Logo.png"
    },
  ];

  const abrirModal = (lenguaje) => {
    setLenguajeSeleccionado(lenguaje);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const Modal = ({ lenguaje, cerrar }) => {
    if (!lenguaje) return null;

    return (
      <div className={styles.modalFondo}>
        <div className={styles.modalContenido}>
          <button className={styles.botonCerrar} onClick={cerrar}>
            &times;
          </button>
          <img
            src={lenguaje.imagen}
            alt={lenguaje.nombre}
            className={styles.imagenModal}
          />
          <h2 className={styles.modaltitle}>{lenguaje.nombre}</h2><br></br>
          <p><strong>Descripción:</strong> {lenguaje.descripcion}</p>
          <p><strong>Casos de uso:</strong> {lenguaje.casosDeUso}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.contenidoPrincipal}>
        <h1 className={styles.tituloPrincipal}>Lenguajes de Programación</h1>

        <div className={styles.gridLenguajes}>
          {lenguajeData.map((lenguaje) => (
            <div
              key={lenguaje.id}
              className={styles.tarjetaLenguaje}
              onClick={() => abrirModal(lenguaje)}
            >
              <img
                src={lenguaje.imagen}
                alt={lenguaje.nombre}
                className={styles.imagenLenguaje}
              />
              <div className={styles.nombreLenguaje}>{lenguaje.nombre}</div>
            </div>
          ))}
        </div>

        {modalAbierto && (
          <Modal
            lenguaje={lenguajeSeleccionado}
            cerrar={cerrarModal}
          />
        )}
      </main>
    </div>
  );
}
