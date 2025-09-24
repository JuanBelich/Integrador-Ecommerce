# 🚀 Guía de Deploy en Render

## 📋 Checklist Pre-Deploy

### ✅ Archivos configurados automáticamente:
- [x] `package.json` - Script de start agregado
- [x] `index.js` - Puerto dinámico y variables de entorno configuradas
- [x] `.env.example` - Template de variables de entorno
- [x] `render.yaml` - Configuración de servicios
- [x] `database/connection.js` - Conexión a PostgreSQL
- [x] `database/init-db.js` - Script de inicialización de DB
- [x] `database/init.sql` - Schema de base de datos corregido

## 🌐 Pasos para Deploy en Render

### 1. Preparar el repositorio
```bash
git add .
git commit -m "Configuración para deploy en Render"
git push origin main
```

### 2. Crear cuenta en Render
- Ve a [render.com](https://render.com)
- Regístrate con GitHub
- Conecta tu repositorio

### 3. Crear Base de Datos PostgreSQL
1. En el Dashboard de Render → **New** → **PostgreSQL**
2. Configuración:
   - **Name**: `ecommerce-db`
   - **Database**: `ecommerce`
   - **User**: `ecommerce_user`
   - **Region**: Oregon (US West)
   - **Plan**: Free
3. Clic en **Create Database**
4. **IMPORTANTE**: Copia la **External Database URL** que aparece

### 4. Crear Web Service
1. En el Dashboard → **New** → **Web Service**
2. Conecta tu repositorio de GitHub
3. Configuración:
   - **Name**: `ecommerce-app`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: (dejar vacío)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 5. Configurar Variables de Entorno
En la sección **Environment Variables** del Web Service, agregar:

```
NODE_ENV=production
DATABASE_URL=[URL_DE_TU_BASE_DE_DATOS_POSTGRESQL]
JWT_SECRET=textoSecretoDECIFRADO
JWT_EXPIRATION=7d
JWT_COOKIE_EXPIRES=1
MERCADOPAGO_ACCESS_TOKEN=[TU_TOKEN_REAL_DE_MERCADOPAGO]
```

### 6. Deploy
1. Clic en **Create Web Service**
2. Render automáticamente:
   - Clonará tu repositorio
   - Ejecutará `npm install`
   - Iniciará la aplicación con `npm start`

## 🔧 Variables de Entorno Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `production` |
| `DATABASE_URL` | URL de conexión a PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Clave secreta para JWT | `textoSecretoDECIFRADO` |
| `JWT_EXPIRATION` | Tiempo de expiración del token | `7d` |
| `JWT_COOKIE_EXPIRES` | Días de expiración de cookies | `1` |
| `MERCADOPAGO_ACCESS_TOKEN` | Token de MercadoPago | `APP_USR-...` |

## 🗄️ Inicialización de Base de Datos

Una vez que el deploy esté funcionando, la base de datos se inicializará automáticamente con el schema definido en `database/init.sql`.

## 🔍 Verificación del Deploy

1. **Logs**: Revisa los logs en Render para verificar que no hay errores
2. **Base de datos**: Verifica que la conexión sea exitosa (aparecerá ✅ en los logs)
3. **Endpoints**: Prueba los endpoints principales:
   - `GET /` - Página principal
   - `GET /login` - Página de login
   - `POST /api/login` - API de autenticación

## 🚨 Troubleshooting

### Error de conexión a base de datos
- Verifica que la `DATABASE_URL` esté correcta
- Asegúrate de que el servicio PostgreSQL esté activo

### Error 503 Service Unavailable
- Revisa los logs del build
- Verifica que todas las dependencias estén en `package.json`

### Error de MercadoPago
- Verifica que el `MERCADOPAGO_ACCESS_TOKEN` sea válido
- Para producción, usa un token real (no TEST)

## 📱 URLs Finales

Después del deploy exitoso, tendrás:
- **App URL**: `https://tu-app-name.onrender.com`
- **Database**: Accesible internamente via `DATABASE_URL`

## 🔄 Re-deploys

Para actualizar la aplicación:
1. Haz cambios en tu código
2. `git push origin main`
3. Render automáticamente re-deployará

---

**¡Tu e-commerce está listo para producción! 🎉**
