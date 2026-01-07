import { Link } from "react-router-dom";

export function Navbar({ total, mostrarSaldo, toggleSaldo }) {
  return (
    <nav className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* SECCIÓN IZQUIERDA: LOGO */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
            <span className="text-3xl">💰</span>
            <h1 className="font-bold text-emerald-400 text-xl tracking-tight hidden sm:block">
              GastosApp
            </h1>
          </div>

          {/* SECCIÓN CENTRAL: MENÚ (Oculto en móvil) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Panel Principal
            </Link>
            <Link
              to="/estadisticas"
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              📊 Estadísticas
            </Link>
            <Link
              to="/categorias"
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🏷️ Categorías
            </Link>
            {/* Exportar sigue siendo <a> porque no es una página interna */}
            <a
              href="#"
              className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              📥 Exportar
            </a>
          </div>

          {/* SECCIÓN DERECHA: SALDO + ACCIONES */}
          <div className="flex items-center gap-4">
            {/* Saldo con Ojito */}
            <div className="flex flex-col items-end mr-2">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                Saldo Actual
              </span>

              <div className="flex items-center gap-2">
                {/* Lógica: Si mostrarSaldo es true, muestra el número, si no puntitos */}
                <span
                  className={`font-bold ${
                    mostrarSaldo
                      ? total >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                      : "text-gray-500 tracking-widest"
                  }`}
                >
                  {mostrarSaldo ? `$${total.toFixed(2)}` : "••••••"}
                </span>

                {/* Botón del Ojito */}
                <button
                  onClick={toggleSaldo}
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  {mostrarSaldo ? (
                    // Ícono Ojo Abierto
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    // Ícono Ojo Cerrado (Tachado)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Separador */}
            <div className="h-8 w-px bg-gray-700 hidden sm:block"></div>

            {/* Avatar */}
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer border-2 border-transparent hover:border-white shadow-lg">
              YM
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
