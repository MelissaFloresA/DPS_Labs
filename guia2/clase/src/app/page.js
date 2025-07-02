"use client";  //DEBE IR AL INICIO PARA EJERCICIO 3
import Image from "next/image";
import styles from "./page.module.css";

//EJERCICIO 1
const element = (
  <>
    <h1>Hola, Mundo!</h1>
    <h2>Son las {new Date().toTimeString()}</h2>
  </>);

//para ejercicio3 use cliente de al inicio
import { useState } from "react";

export default function Home() {
  /*return (
  <div className={styles.page}>
      <main className={styles.main}>
        <div className="App">
          {element}
        </div>
      </main>
    </div> 
)*/

  
    //PARA EJERCICIO 2
    const equiposData = [
      {
        "id": 1,
        "nombre": "Real Madrid",
        "plantilla": [
          { "id": 1, "nombre": "Eden Hazard", "Altura": "1.75", "Peso": "74Kg", "foto": "https://s.hs-data.com/bilder/spieler/gross/87809.jpg"},
          {"id": 2, "nombre": "Gonzalo García", "Altura": "1.82", "Peso": "74Kg", "foto": "https://s.hs-data.com/bilder/spieler/gross/600867.jpg"},
          { "id": 3, "nombre": "Karim Benzema", "Altura": "1.85", "Peso": "81Kg", "foto": "https://thumbs.dreamstime.com/b/karim-benzema-de-real-madrid-48817696.jpg" }
        ]
      },
  
      {
        "id": 2,
        "nombre": "Barcelona",
        "plantilla": [
          { "id": 1, "nombre": "Marc-André ter Stegen", "Altura": "1.75", "Peso": "74Kg", "foto": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCMdzots9m3xJf7FRDow4rDDweMCq2e-WdhQ&s"},
          { "id": 2, "nombre": "Iñigo Martinez", "Altura": "1.82", "Peso": "74Kg", "foto": "https://img.asmedia.epimg.net/resizer/v2/3HEI7Y7UYVL7H4JGPEZ4BGRA4E.jpg?auth=e568c44b7c13492f1e72baf218a8851cf320cd547d6353f2880d3d697ff5ffbe&width=1200&height=1200&focal=2244%2C140" },
          { "id": 3, "nombre": "Gavi", "Altura": "1.85", "Peso": "81Kg", "foto": "https://s.hs-data.com/bilder/spieler/gross/511270.jpg" }
        ]
      }
    ];
  
  
    const Equipos = ({ equipos }) => {
      return (
        <div className={styles.container__list}>
          <h2 className={styles.title}>Equipos de Fútbol</h2>
          {equipos.map((equipo) => (
            <div key={equipo.id}>
              <h3 className={styles.nameclub}>{equipo.nombre}</h3>
              <ul >
                {equipo.plantilla.map((jugador) => (
                  <li className={styles.container__list} key={jugador.id}>
                    <strong>{jugador.nombre}</strong>
                    <p>Altura: {jugador.Altura}m 
                      <br></br> 
                      Peso: {jugador.Peso}Kg</p>
                    <img src ={jugador.foto} width="100px"></img>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    };
  
    return (
      <main className={styles.main}>
        <div>
          <h1>Mi Aplicación de Fútbol</h1>
          <Equipos equipos={equiposData} />
        </div>
      </main>
    ); 


  //EJERCICIO 3
  /*
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(null);

  const sumar = () => {
    const resultadoSuma = parseFloat(numero1) + parseFloat(numero2);
    setResultado(`Resultado de la suma: ${resultadoSuma}`);
  };

  const restar = () => {
    const resultadoResta = parseFloat(numero1) - parseFloat(numero2);
    setResultado(`Resultado de la resta: ${resultadoResta}`);
  };

  const multiplicar = () => {
    const resultadoMulti = parseFloat(numero1) * parseFloat(numero2);
    setResultado(`Resultado de la multiplicacion: ${resultadoMulti}`);
  };

  const dividir = () => {
    const n1 = parseFloat(numero1);
    const n2 = parseFloat(numero2);
    if (n2 == 0) {
      setResultado(`Error: Division entre cero `);
    }
    else {
      const resultadoDiv = parseFloat(numero1) / parseFloat(numero2);
      setResultado(`Resultado de la division: ${resultadoDiv}`);
    }
  };

  const potencia = () => {
    const resultadoPotencia = Math.pow(parseFloat(numero1), parseFloat(numero2));
    setResultado(`Resultado de la potencia: ${resultadoPotencia}`);
  };

  const raiz = () => {
    const n1 = parseFloat(numero1);
    if (n1 < 0) {
      setResultado(`Error: Raiz imaginaria, ${n1} es negativo`);
    }
    else {
      const resultadoRaiz = Math.sqrt(n1);
      setResultado(`Resultado de la division: ${resultadoRaiz}`);
    }
  };

  const reiniciar = () => {
    setNumero1('');
    setNumero2('');
  };

  const DEL1 = () => {
    const n1 = numero1;
    const newn1 = n1.substring(0, n1.length - 1)
    setNumero1(newn1);
  };

   const DEL2 = () => {
    const n2 = numero2;
    const newn2 = n2.substring(0, n2.length - 1)
    setNumero2(newn2);
  };

  return (<main className={styles.main}>
    <div className={styles.calculadora}>
      <div className={styles.numeros}>
        <label className={styles.text}>Número 1:</label> <input className={styles.inputnum}
          type="number" value={numero1} onChange={(e) => setNumero1(e.target.value)} />
          <button className={styles.button3} onClick={DEL1}>DEL</button>
      </div>
      <div className={styles.numeros}>
        <label className={styles.text} >Número 2:</label> <input
          className={styles.inputnum} type="number" value={numero2} onChange={(e) =>
            setNumero2(e.target.value)} />
          <button className={styles.button3} onClick={DEL2}>DEL</button>
      </div>
      <div>
        <button className={styles.button} onClick={sumar}>Sumar</button>
        <button className={styles.button} onClick={restar}>Restar</button>
        <button className={styles.button} onClick={multiplicar}>Multiplicar</button>
        <button className={styles.button} onClick={dividir}>Dividir</button>
        <button className={styles.button} onClick={potencia}>Potencia</button>
        <button className={styles.button} onClick={raiz}>Raiz</button>
      </div>
      <br></br>
      <div>
        <button className={styles.button2} onClick={reiniciar}>Reiniciar</button>
      </div>
      {resultado && <div
        className={styles.resultado}>{resultado}</div>}
    </div>
  </main>
  );
  */

  //EJERCICIO 4. TABLA DE MULTIPLICAR
  /*
  const [numero, setNumero] = useState(1); const [limite, setLimite] =
    useState(10); const [resultado, setResultado] = useState([]);
  const generarTabla = () => {
    const nuevaTabla = []; for (let i = 1; i <= limite; i++) {
      nuevaTabla.push(`${numero} x ${i} = ${numero * i}`);
    }
    setResultado(nuevaTabla);
  };
  return (
    <main className={styles.main}>
      <div>
        <h2 className={styles.title2}>Tabla de Multiplicar</h2> <label className={styles.text}>
          Ingrese un número:
          <input className={styles.input} type="number" value={numero}
            onChange={(e) => setNumero(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label className={styles.text}>
          Límite de números a mostrar: <input
            className={styles.input} type="number" value={limite}
            onChange={(e) => setLimite(parseInt(e.target.value))} />
        </label>
        <br />
        <button className={styles.button} onClick={generarTabla}>Generar
          Tabla</button>
        <hr />
        <h3>Resultado</h3>
        <ul className={styles.ul}>
          {resultado.map((item, index) => (
            <li className={styles.li} key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );  */

}//fin fome
