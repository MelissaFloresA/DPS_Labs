import styles from "./page.module.css";
import FormCompras from "./components/FormCompras";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className="App">
        <div>
          <p>
            Lista de Compras
          </p>
          <FormCompras></FormCompras>
        </div>
      </div>
    </main>
  );
}