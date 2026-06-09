# EnoTime - Vacation and Compensatory Management System ⏱️🌴

EnoTime es una solución tecnológica desarrollada para automatizar, centralizar y auditar el ciclo de vida completo de las solicitudes de vacaciones y días compensatorios para la empresa Enovate.

Este sistema optimiza la interacción entre colaboradores, jefaturas directas y administración, garantizando la trazabilidad de los saldos bajo un entorno seguro y escalable, sentando las bases para un portal corporativo integral de talento humano.

## 🏗️ Arquitectura del Sistema

El proyecto está construido bajo los principios de **Arquitectura Hexagonal (Puertos y Adaptadores)** y separación de responsabilidades (Three-Tier), asegurando un código limpio, mantenible y altamente escalable.

* **Frontend:** React.js (SPA) con TypeScript y Vite. Estructurado estrictamente en capas:
    * `domain/`: Tipos, interfaces y reglas de negocio.
    * `infrastructure/`: Gateways y adaptadores para la comunicación con la API (Fetch/Axios).
    * `application/`: Custom Hooks que manejan la lógica de estado y orquestación.
    * `presentation/`: Componentes UI y vistas puras (`.tsx`).
* **Backend:** Node.js / Express. Gestión de rutas, controladores, autenticación JWT y encriptación con Bcrypt.
* **Base de Datos:** PostgreSQL. Integridad referencial, control de saldos y flujos de auditoría mediante un modelo robusto.

---

## 🚀 Guía de Instalación y Ejecución Local

Sigue estos pasos para desplegar el proyecto en tu entorno local.

### Prerrequisitos
* [Node.js](https://nodejs.org/) (v18 o superior)
* [PostgreSQL](https://www.postgresql.org/) (v14 o superior)
* Gestor de paquetes: `npm` o `pnpm` (recomendado).

---

### 1. Configuración de la Base de Datos

1. Abre pgAdmin o tu gestor de base de datos preferido.
2. Crea una nueva base de datos llamada `enotime_bd`.
3. Localiza el script maestro de base de datos (por ejemplo, `database.sql` en la carpeta `/Database` o en la raíz) y ejecuta su contenido completo en el Query Tool.

> **Nota:** Este script generará automáticamente las tablas, tipos de datos (ENUMs), e insertará la data inicial.
> 
> **Credenciales de prueba generadas por defecto:**
> * **Administrador:** `admin@enotime.com` | Password: `Admin2026*`
> * **Empleado:** `user@enotime.com` | Password: `Enotime2026*`

---

### 2. Configuración del Backend

Abre una terminal y navega a la carpeta del backend:

```
cd enotime-backend

```

Instala las dependencias:

```
pnpm install

```

Crea un archivo `.env` en la raíz de `enotime-backend` con las siguientes variables de entorno:

```
PORT=3001
DB_USER=postgres
DB_PASSWORD=tu_contraseña_de_postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=enotime_bd
JWT_SECRET=tu_secreto_super_seguro_para_jwt

```

Inicia el servidor en modo desarrollo:

```bash
pnpm run dev

```

*(El backend debería estar corriendo exitosamente en `http://localhost:3001`)*

---

### 3. Configuración del Frontend

Abre **otra terminal** y navega a la carpeta del frontend:

```bash
cd enotime-frontend

```

Instala las dependencias:

```
pnpm install

```

Crea un archivo `.env.local` en la raíz de `enotime-frontend` con la URL de conexión a tu API:

```
VITE_API_URL=http://localhost:3001

```

Inicia la aplicación de React:

```
pnpm run dev

```

*(El frontend se abrirá automáticamente en tu navegador en `http://localhost:5173`)*

---

## 🛠️ Tecnologías Principales y Buenas Prácticas

* **React + TypeScript:** Tipado estricto (`verbatimModuleSyntax` activado) para evitar errores en tiempo de compilación y garantizar la fiabilidad del código.
* **Sass (SCSS):** Estilos modulares y mantenibles utilizando la metodología **BEM** (Block, Element, Modifier).
* **React Router Dom:** Gestión de rutas dinámicas y protegidas según el rol del usuario validado en el token (Admin / Employee).
* **Sonner:** Sistema de notificaciones toast integradas y estilizadas.
* **JWT & Bcrypt:** Seguridad robusta de sesiones y contraseñas hasheadas directamente en la base de datos.
* **Componentes Genéricos:** Tablas compartidas (`TableShared`) con capacidades de ordenamiento, filtrado y renderizado dinámico.

---

## 👤 Autor

**Paula Catalina Delgado Almendrales** *Ingeniera de Sistemas / Full Stack Developer*

```

```
