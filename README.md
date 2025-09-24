# 🛒 E-commerce Integrador

Aplicación de e-commerce desarrollada con Node.js, Express y PostgreSQL, integrada con MercadoPago para procesamiento de pagos.

## 🚀 Características

- ✅ Sistema de autenticación con JWT
- ✅ Integración con MercadoPago
- ✅ Base de datos PostgreSQL
- ✅ API RESTful
- ✅ Deploy ready para Render

## 🛠️ Tecnologías

- **Backend**: Node.js, Express.js
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT, bcrypt
- **Pagos**: MercadoPago SDK
- **Deploy**: Render

## 📦 Instalación Local

1. Clona el repositorio
```bash
git clone [tu-repo-url]
cd Integrador-Ecommerce
```

2. Instala dependencias
```bash
npm install
```

3. Configura variables de entorno
```bash
cp .env.example .env
# Edita .env con tus valores
```

4. Inicializa la base de datos
```bash
npm run init-db
```

5. Ejecuta en modo desarrollo
```bash
npm run dev
```

## 🌐 Deploy en Producción

Ver [DEPLOY.md](./DEPLOY.md) para instrucciones completas de deploy en Render.

## 📁 Estructura del Proyecto

```
├── client/                 # Archivos del frontend
├── controllers/           # Controladores de la API
├── database/             # Configuración y scripts de DB
│   ├── connection.js     # Conexión a PostgreSQL
│   ├── init.sql         # Schema de la base de datos
│   └── init-db.js       # Script de inicialización
├── middlewares/          # Middlewares personalizados
├── public/              # Archivos estáticos
├── index.js            # Servidor principal
├── package.json        # Dependencias y scripts
├── render.yaml         # Configuración de Render
└── .env.example        # Template de variables de entorno
```

## 🔧 Scripts Disponibles

- `npm start` - Ejecuta la aplicación en producción
- `npm run dev` - Ejecuta en modo desarrollo con nodemon
- `npm run init-db` - Inicializa la base de datos

## 🌍 Variables de Entorno

Ver `.env.example` para todas las variables requeridas.

## 📄 Licencia

ISC