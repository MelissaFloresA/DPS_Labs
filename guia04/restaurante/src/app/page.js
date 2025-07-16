'use client';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ListaMesas from '../componentes/ListaMesas';
import ListaPedidos from '../componentes/ListaPedidos';
import '../style/globales.css';
import '../style/mesas.css';
import '../style/pedidos.css';
import '../style/menu.css';
import '../style/formulario.css';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="contenedorPrincipal">
        <header>
          <h1>Restaurante Típicos Mel</h1>
        </header>
        
        <main>
          <ListaMesas />
          <ListaPedidos />
        </main>
      </div>
    </Provider>
  );
}