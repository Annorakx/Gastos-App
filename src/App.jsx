import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  // Local State Management
  const [titulo, setTitulo] = useState('')
  const [monto, setMonto] = useState('')
  const [categoria, setCategoria] = useState('Comida')
  const [listaMovimientos, setListaMovimientos] = useState([])

  // Fetch initial data on component mount
  useEffect(() => {
    obtenerMovimientos()
  }, [])

  // Data Fetching: Retrieve transactions from Supabase
  const obtenerMovimientos = async () => {
    const { data, error } = await supabase
      .from('movimientos')
      .select('*')
      .order('id', { ascending: false })

    if (error) console.error('Error fetching data:', error)
    else setListaMovimientos(data)
  }

  // Handler: Submit new transaction
  const agregarGasto = async (e) => {
    e.preventDefault()
    if (!titulo || !monto) return

    try {
      const { error } = await supabase.from('movimientos').insert({
        titulo: titulo,
        monto: parseFloat(monto),
        categoria: categoria
      })

      if (error) throw error
      
      // Reset form and refresh data
      setTitulo('')
      setMonto('')
      obtenerMovimientos()
    } catch (error) {
      alert(error.message)
    }
  }

  // Handler: Delete transaction by ID
  const borrarGasto = async (id) => {
    try {
      const { error } = await supabase.from('movimientos').delete().eq('id', id)
      if (error) throw error
      obtenerMovimientos()
    } catch (error) {
      console.error('Error deleting:', error)
    }
  }

  // Derived State: Calculate total balance
  const saldoTotal = listaMovimientos.reduce((total, item) => total + item.monto, 0)

  return (
    <div className="main-container">
      <div className="w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center mb-8 text-emerald-400">
          💰 Control de Gastos
        </h1>

        {/* Input Section */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Nuevo Movimiento</h2>
          
          <form onSubmit={agregarGasto} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="¿En qué gastaste?"
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)}
              className="input-custom"
            />
            
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="Monto" 
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="input-custom w-1/2"
              />
              <select 
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="input-custom w-1/2"
              >
                <option value="Comida">🍔 Comida</option>
                <option value="Transporte">🚌 Transporte</option>
                <option value="Ocio">🎉 Ocio</option>
                <option value="Casa">🏠 Casa</option>
              </select>
            </div>

            <button className="btn-primary">
              Agregar Gasto
            </button>
          </form>
        </div>

        {/* Balance Summary */}
        <div className="card flex flex-col items-center justify-center">
             <p className="text-gray-400 text-sm uppercase tracking-wider">Gasto Total</p>
             <p className="text-4xl font-bold text-emerald-400 mt-1">
                ${saldoTotal.toFixed(2)}
             </p>
        </div>

        {/* Transaction History List */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Historial</h2>
          
          <div className="flex flex-col gap-3">
            {listaMovimientos.length === 0 ? (
              <p className="text-gray-400 text-center">No hay gastos aún</p>
            ) : (
              listaMovimientos.map((item) => (
                <div key={item.id} className="list-item">
                  <div>
                    <p className="font-bold">{item.titulo}</p>
                    <p className="text-xs text-gray-400">{item.categoria}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400 font-bold">${item.monto}</span>
                    <button 
                      onClick={() => borrarGasto(item.id)}
                      className="text-red-400 hover:text-red-300 text-xl"
                      aria-label="Eliminar gasto"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App