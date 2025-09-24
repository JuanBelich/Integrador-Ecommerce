# Instrucciones para Desplegar en Render

## Problemas Solucionados

### 1. URLs dinámicas para desarrollo y producción
- ✅ Los archivos `cart.js` y `mostrarProductos.js` ahora detectan automáticamente si están en desarrollo (localhost) o producción
- ✅ En desarrollo usan `http://localhost:8080`
- ✅ En producción usan la URL actual del sitio

### 2. Archivo index.js inexistente
- ✅ Eliminada la referencia a `/index.js` en el HTML que causaba error 404

### 3. Manejo de errores mejorado
- ✅ Mensajes de error más específicos en el servidor
- ✅ Mejor logging de errores en el frontend

## Variables de Entorno para Render

Asegúrate de configurar estas variables de entorno en Render:

```
NODE_ENV=production
MERCADOPAGO_ACCESS_TOKEN=TEST-8598427112739393-091023-77f6797dd4923ab9b7c83a9e446702e0-348195049
JWT_SECRET=textoSecretoDECIFRADO
JWT_EXPIRATION=7d
JWT_COOKIE_EXPIRES=1
DATABASE_URL=tu_url_de_base_de_datos_postgresql
```

## Pasos para Desplegar

1. **Subir los cambios a GitHub**
   ```bash
   git add .
   git commit -m "Fix: URLs dinámicas y manejo de errores mejorado"
   git push origin main
   ```

2. **En Render Dashboard**
   - Ve a tu servicio web
   - Haz clic en "Manual Deploy" → "Deploy latest commit"
   - O espera a que se despliegue automáticamente si tienes auto-deploy habilitado

3. **Verificar Variables de Entorno**
   - Ve a "Environment" en tu servicio de Render
   - Asegúrate de que todas las variables estén configuradas correctamente

## Verificación Post-Despliegue

1. **Probar la aplicación**
   - Visita tu URL de Render
   - Agrega productos al carrito
   - Intenta hacer checkout

2. **Revisar logs**
   - Si hay errores, revisa los logs en Render Dashboard
   - Los errores ahora aparecerán con más detalle en la consola

## Notas Importantes

- El token de Mercado Pago actual es de TEST, perfecto para pruebas
- Para producción real, necesitarás un token de producción
- La base de datos debe estar configurada y accesible desde Render
