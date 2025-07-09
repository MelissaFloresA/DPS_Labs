import estilos from '../page.module.css';

export default function SelectorAno({ datos, anoSeleccionado, onSelectAno }) {
  const anos = datos.map(item => item.año);

  return (
    <div className={estilos.selectorAno}>
      <label htmlFor="ano" className={estilos.etiquetaSelector}>Seleccionar Año: </label>
      <select 
        id="año"
        value={anoSeleccionado}
        onChange={(e) => onSelectAno(Number(e.target.value))}
        className={estilos.selectAno}
      >
        {anos.map(año => (
          <option key={año} value={año}>{año}</option>
        ))}
      </select>
    </div>
  );
}