import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'
import './Filters.css'

export function Filters () {
  const { filters, setFilters } = useFilters()

  const categoryFilterId = useId()

  const handleChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          <option value='Perros'>Perros</option>
          <option value='Hamburguezas'>Hamburguesas</option>
          <option value='Sandwiches'>Sándwiches</option>
          <option value='Salvajadas'>Salvajadas</option>
          <option value='Salchipapas'>Salchipapas</option>
          <option value='Asados'>Asados</option>
          {/* <option value='Pizzas'>Pizzas</option> */}
          <option value='Adcionales'>Adicionales</option>
          {/* <option value='Bebidas'>Bebidas</option> */}
        </select>
      </div>
    </section>
  )
}
