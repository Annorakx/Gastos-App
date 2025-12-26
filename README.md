# 💰 Control de Gastos (Expense Tracker)

Una aplicación web **Fullstack** moderna para la gestión de finanzas personales. Permite registrar ingresos y gastos, visualizarlos en tiempo real y mantener un control del saldo actual.

![Vista Previa](./docs/Screenshot.png)

## 🚀 Tecnologías

Este proyecto fue construido siguiendo las mejores prácticas de desarrollo moderno:

* **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/) (Rendimiento optimizado).
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Diseño responsivo y Dark Mode).
* **Backend (BaaS):** [Supabase](https://supabase.com/) (Base de datos PostgreSQL en tiempo real).
* **Control de Versiones:** Git & GitHub.

## ✨ Características Principales

* **Dashboard en Tiempo Real:** Visualización instantánea del saldo total.
* **CRUD Completo:**
    * ✅ Crear nuevos movimientos.
    * ✅ Leer historial desde la base de datos.
    * ✅ Eliminar registros erróneos.
* **Interfaz Moderna:** Diseño oscuro (Dark Mode) agradable a la vista y totalmente responsive.
* **Validaciones:** Prevención de registros vacíos o incorrectos.

## 🛠️ Instalación y Configuración Local

Si deseas correr este proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/gastos-app.git](https://github.com/TU_USUARIO/gastos-app.git)
    cd gastos-app
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y agrega tus credenciales de Supabase:
    ```env
    VITE_SUPABASE_URL=TU_URL_DE_SUPABASE
    VITE_SUPABASE_KEY=TU_ANON_PUBLIC_KEY
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

## 🔮 Próximas Mejoras (Roadmap)

* [ ] Agregar campo de fecha a los movimientos.
* [ ] Gráficos estadísticos de gastos por categoría.
* [ ] Autenticación de usuarios (Login).

---
Desarrollado con ❤️ por Yussef Merhi