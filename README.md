# API Fotos Camping 📸

API microservicio para gestión de imágenes en Cloudinary. Consumida por otro backend.

## Características

- ✅ Subida de imágenes a Cloudinary
- ✅ Eliminación de imágenes
- ✅ Validación con Zod
- ✅ Autenticación JWT
- ✅ CORS configurado
- ✅ Manejo robusto de errores

## Requisitos

- Node.js 16+
- npm/yarn
- Variables de entorno configuradas

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
ALLOWED_URL=http://localhost:5000
JWT_SECRET=tu_secret_aqui
CLOUDINARY_NAME=tu_nombre_cloudinary
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints

### 1. Verificar API

```
GET /api/
```

Respuesta:
```json
{
  "exito": true,
  "mensaje": "API funcionando"
}
```

### 2. Subir imagen

```
POST /api/subirImagen
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data
```

**Parámetros:**
- `imagen` (file) - Imagen en formato: JPEG, PNG, WebP, GIF (máx 5MB)

**Respuesta exitosa:**
```json
{
  "exito": true,
  "mensaje": "Imagen subida correctamente",
  "datos": {
    "public_id": "id_en_cloudinary",
    "secure_url": "https://..."
  },
  "error": null
}
```

**Error de validación:**
```json
{
  "exito": false,
  "mensaje": "Formato no permitido. Acepta: image/jpeg, image/png, image/webp, image/gif, image/jpg",
  "codigo": "ErrorDatosInvalidos"
}
```

### 3. Eliminar imagen

```
DELETE /api/eliminarImagen
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body:**
```json
{
  "public_id": "id_en_cloudinary"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "mensaje": "Imagen eliminada correctamente",
  "datos": {
    "result": "ok"
  }
}
```

## Errores

| Código | Descripción |
|--------|-------------|
| `ErrorImagenNoRecibida` | No se enviaron datos de imagen |
| `ErrorDatosInvalidos` | Formato o tamaño de imagen inválido |
| `ErrorConexionCloudinary` | Error al conectar con Cloudinary |
| `ErrorEliminacionImagenFallida` | Error al eliminar imagen |
| `TokenFaltante` | No se envió token JWT |
| `TokenInvalido` | Token expirado o inválido |

## Seguridad

- ✅ JWT requerido en endpoints de imagen
- ✅ CORS restringido a URL específica
- ✅ Validación Zod en archivos
- ✅ X-Powered-By deshabilitado
- ✅ Tamaño máximo de archivo: 5MB

## Estructura del proyecto

```
.
├── app.js
├── package.json
├── 1-rutas/
│   └── rutas.js
├── 2-controlador/
│   └── controladorImagen.js
├── 3-modelo/
│   └── modeloImagen.js
├── 4-cloudinary/
│   └── conexion.js
├── 5-utilidades/
│   ├── respuesta.js
│   └── respuestaCloudinary.js
├── 6-errores/
│   └── ErroresPersonalizados.js
├── middleware/
│   ├── manejoDeErrores.js
│   ├── validarJWT.js
│   └── validarImagen.js
└── uploads/
```

## Testing

Usa el archivo `test.http` para probar endpoints con REST Client:

1. Genera un token: `node generadorToken.js`
2. Reemplaza `@token` en `test.http`
3. Abre `test.http` en VS Code y ejecuta los tests

## Deploy en Render

**Build Command:**
```
npm install
```

**Start Command:**
```
node app.js
```

**Variables de entorno:**
- `PORT`
- `ALLOWED_URL`
- `JWT_SECRET`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Desarrollo

```bash
npm run dev  # Ejecuta con nodemon
```

## Licencia

ISC
