import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

// Aceptamos la nueva propiedad 'toggleSaldo'
export function Dashboard({ mostrarSaldo, toggleSaldo }) {
  const [titulo, setTitulo] = useState('')
  const [monto, setMonto] = useState('')
  const [categoria, setCategoria] = useState('Comida')
  const [fecha, setFecha] = useState('')
  const [listaMovimientos, setListaMovimientos] = useState([])

  useEffect(() => {
    obtenerMovimientos()
  }, [])

  const obtenerMovimientos = async () => {
    const { data, error } = await supabase
      .from('movimientos')
      .select('*')
      .order('fecha', { ascending: false })
    if (!error) setListaMovimientos(data)
  }

  const agregarGasto = async (e) => {
    e.preventDefault()
    if (!titulo || !monto) return
    try {
      const { error } = await supabase.from('movimientos').insert({
        titulo: titulo,
        monto: parseFloat(monto),
        categoria: categoria,
        fecha: fecha ? fecha : new Date().toISOString()
      })
      if (error) throw error
      setTitulo(''); setMonto(''); setFecha('');
      obtenerMovimientos()
    } catch (error) {
      alert(error.message)
    }
  }

  const borrarGasto = async (id) => {
    const { error } = await supabase.from('movimientos').delete().eq('id', id)
    if (!error) obtenerMovimientos()
  }

  const saldoTotal = listaMovimientos.reduce((total, item) => total + item.monto, 0)

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* 1. PRIMERO: El Formulario (Nuevo Movimiento) */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Nuevo Movimiento</h2>
        <form onSubmit={agregarGasto} className="flex flex-col gap-4">
          <input type="text" placeholder="¿En qué gastaste?" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="input-custom" />
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="input-custom text-gray-400" />
          <div className="flex gap-2">
            <input type="number" placeholder="Monto" value={monto} onChange={(e) => setMonto(e.target.value)} className="input-custom w-1/2" />
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="input-custom w-1/2">
              <option value="Comida">🍔 Comida</option>
              <option value="Transporte">🚌 Transporte</option>
              <option value="Ocio">🎉 Ocio</option>
              <option value="Casa">🏠 Casa</option>
            </select>
          </div>
          <button className="btn-primary">Agregar Gasto</button>
        </form>
      </div>

      {/* 2. SEGUNDO: Balance Actual (Ahora en el medio y con botón) */}
      <div className="card flex flex-col items-center justify-center py-6 mb-6 relative">
          <p className="text-gray-400 text-sm uppercase tracking-wider">Balance Actual</p>
          
          <div className="flex items-center gap-3 mt-2">
            <p className={`text-5xl font-bold ${mostrarSaldo ? 'text-emerald-400' : 'text-gray-600 tracking-widest'}`}>
              {mostrarSaldo ? `$${saldoTotal.toFixed(2)}` : '••••••'}
            </p>

            {/* Botón del Ojito (El mismo estilo que el Navbar) */}
            <button 
              onClick={toggleSaldo}
              className="text-gray-500 hover:text-emerald-400 transition-colors p-2 rounded-full hover:bg-gray-700/50"
              title={mostrarSaldo ? "Ocultar saldo" : "Mostrar saldo"}
            >
              {mostrarSaldo ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              )}
            </button>
          </div>
      </div>

      {/* 3. TERCERO: Historial */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Historial Reciente</h2>
        <div className="flex flex-col gap-3">
          {listaMovimientos.map((item) => (
            <div key={item.id} className="list-item hover:bg-gray-750 transition-colors">
              <div>
                <p className="font-bold">{item.titulo}</p>
                <p className="text-xs text-gray-400">{item.categoria} • {new Date(item.fecha).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${mostrarSaldo ? 'text-emerald-400' : 'text-gray-500 blur-sm select-none'}`}>
                  ${item.monto}
                </span>
                <button onClick={() => borrarGasto(item.id)} className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}