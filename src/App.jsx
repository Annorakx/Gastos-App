import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import { Estadisticas } from './pages/Estadisticas'
import { Categorias } from './pages/Categorias'

function App() {
  // 1. Estado para la Privacidad (El ojito)
  const [mostrarSaldo, setMostrarSaldo] = useState(false)
  
  // 2. Estado para el Total Global (Para el Navbar)
  const [totalGlobal, setTotalGlobal] = useState(0)

  useEffect(() => {
    // Calculamos el total inicial al cargar la app
    calcularTotal()
    
    // Opcional: Escuchar cambios en tiempo real (más avanzado, por ahora esto sirve)
    const channel = supabase
      .channel('table_db_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'movimientos' }, () => {
        calcularTotal()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const calcularTotal = async () => {
    const { data } = await supabase.from('movimientos').select('monto')
    if (data) {
      const suma = data.reduce((acc, item) => acc + item.monto, 0)
      setTotalGlobal(suma)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Navbar recibe el total y el control del ojito */}
      <Navbar 
        total={totalGlobal} 
        mostrarSaldo={mostrarSaldo} 
        toggleSaldo={() => setMostrarSaldo(!mostrarSaldo)} 
      />

      <main className="p-4 mt-4">
        <Routes>
          {/* Le pasamos mostrarSaldo al Dashboard para que oculte/muestre los números grandes */}
          <Route 
            path="/" 
            element={
              <Dashboard 
                mostrarSaldo={mostrarSaldo} 
                toggleSaldo={() => setMostrarSaldo(!mostrarSaldo)} 
              />
            } 
          />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/categorias" element={<Categorias />} />
        </Routes>
      </main>

    </div>
  )
}

export default App