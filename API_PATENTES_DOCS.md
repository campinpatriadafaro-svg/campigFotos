# 🚗 API Detección de Patentes - Documentación

API Flask para detección automática de patentes vehiculares usando visión por computadora, OCR y machine learning.

## 📋 Descripción General

Esta aplicación proporciona un sistema completo para:
- 📷 Captura de video en tiempo real desde cámara web
- 🎯 Detección de patentes usando YOLOv8
- 📖 Lectura de patentes con PaddleOCR y Tesseract
- 🌐 Exposición pública mediante túnel Cloudflare
- 📊 Validación de reservas contra Google Sheets
- ✅ Endpoints REST para detección de patentes

## 🛠️ Requisitos

### Dependencias Python
```
Flask
Flask-CORS
opencv-python (cv2)
pytesseract
PaddleOCR
ultralytics (YOLO)
requests
numpy
```

### Archivos Necesarios
- `best.pt` - Modelo YOLOv8 pre-entrenado para detección de patentes
- `cloudflared.exe` - Cliente de túnel Cloudflare (Windows)
- `tesseract/tesseract.exe` - Motor OCR Tesseract
- `paddle_models/` - Modelos de PaddleOCR

## 🚀 Inicio Rápido

### 1. Instalación de Dependencias
```bash
pip install flask flask-cors opencv-python pytesseract paddleocr ultralytics requests numpy
```

### 2. Configuración
El programa configura automáticamente:
- Rutas de modelos OCR y YOLO
- Variables de entorno para Paddle
- Rutas de Tesseract según tipo de ejecución (script o .exe)

### 3. Ejecutar el Servidor
```bash
python main.py
```

**Salida esperada:**
```
📷 Iniciando cámara global...
✅ Cámara global iniciada
🚀 Iniciando servidor...
🌐 Iniciando túnel...
🌐 URL pública: https://xxx-yyy.trycloudflare.com
✅ Token válido – servicio activo
```

## 🔌 Endpoints

### 1. **GET** `/iniciar`
Captura patente desde cámara en tiempo real (máx 20 intentos).

**Respuesta exitosa:**
```json
{
  "exito": true,
  "patente": "ABC123",
  "data": {
    "patente": "ABC123",
    "huésped": "Juan Pérez",
    "fechaIngreso": "2024-02-04"
  },
  "intentos": 5,
  "tiempo": 1.23
}
```

**Error:**
```json
{
  "exito": false,
  "mensaje": "No se detectó patente",
  "intentos": 20,
  "tiempo": 3.00
}
```

---

### 2. **GET** `/buscarPatente`
Busca una patente específica en Google Sheets.

**Parámetro:**
- `patente` (string) - Patente a buscar (ej: `ABC123`)

**Request:**
```
GET /buscarPatente?patente=ABC123
```

**Respuesta:**
```json
{
  "exito": true,
  "mensaje": "Patente encontrada",
  "patente": "ABC123",
  "data": {
    "patente": "ABC123",
    "huésped": "Juan Pérez",
    "estado": "activa"
  },
  "intentos": 1,
  "tiempo": 0.45
}
```

---

### 3. **POST** `/recibirImagen`
Detecta patente desde una imagen enviada.

**Body:** `multipart/form-data`
- `imagen` (file) - Archivo de imagen (JPG, PNG, etc.)

**Respuesta exitosa:**
```json
{
  "exito": true,
  "mensaje": "Patente encontrada",
  "patente": "AB123CD",
  "data": {
    "patente": "AB123CD",
    "huésped": "María García",
    "fechaIngreso": "2024-02-04"
  },
  "intentos": 1,
  "tiempo": 0.87
}
```

**Error:**
```json
{
  "exito": false,
  "mensaje": "Patente no encontrada",
  "patente": null,
  "intentos": 1,
  "tiempo": 0.56
}
```

---

### 4. **POST** `/detectarPatente`
Detecta patente desde URL de imagen.

**Body:** JSON
```json
{
  "url": "https://example.com/imagen.jpg"
}
```

**Respuesta:**
```json
{
  "exito": true,
  "patente": "XYZ789"
}
```

---

### 5. **GET** `/status`
Estado actual de la cámara.

**Respuesta:**
```json
{
  "camera_activa": true,
  "camera_abierta": true
}
```

---

### 6. **GET** `/test`
Prueba rápida con frame actual de cámara.

**Respuesta:**
```json
{
  "exito": true,
  "patente": "ABC123"
}
```

---

### 7. **GET** `/`
Información general de la API.

**Respuesta:**
```json
{
  "mensaje": "API de patentes con cámara pre-iniciada",
  "camera": "activa",
  "endpoints": {
    "GET /iniciar": "Busca patente (rápido)",
    "GET /status": "Estado de cámara",
    "GET /test": "Prueba con frame actual"
  }
}
```

---

### 8. **GET** `/shutdown`
Detiene el servidor.

---

### 9. **GET** `/pruebaURL`
Prueba que la URL pública está activa.

## 🔐 Seguridad

### CORS Configurado
Orígenes permitidos:
- `https://v0-mobile-web-app-seven-nu.vercel.app`
- `https://v0-fixapilogic.vercel.app`
- `https://v0-campingappredesign.vercel.app`
- `https://campig-muestra-01.onrender.com`
- `http://localhost:3000`

### Validación de Token
- Se requiere `PASSWORD` válido para activar túnel
- Token se valida contra backend en `campig-muestra-01.onrender.com`

## 🌐 Túnel Cloudflare

El sistema crea automáticamente un túnel Cloudflare que:
1. Expone el servidor local en una URL pública
2. Valida el token contra el backend principal
3. Aborta si el token es inválido
4. Se cierra al detener el servidor

**Proceso:**
```
Inicio → Inicia Cloudflare → Obtiene URL pública
→ Envía token a backend → Valida respuesta 
→ Si OK → Servidor activo | Si Error → Cierra túnel
```

## 🎯 Detección de Patentes

### Patrones Soportados
- **Argentina:** `ABC123` (3 letras + 3 números)
- **Argentina Nueva:** `AB123CD` (2 letras + 3 números + 2 letras)

### Algoritmo
1. **Captura:** Frame desde cámara (640x480)
2. **Detección YOLO:** Localiza la región de patente
3. **OCR:** Lee el texto con PaddleOCR
4. **Validación:** Verifica patrón de patente
5. **Búsqueda:** Consulta Google Sheets

### Configuración de Cámara
- Índice: `0` (primera cámara disponible)
- Resolución: `640x480`
- FPS: Variables según carga

## 📊 Consulta Google Sheets

La aplicación consulta un Google Sheet con las reservas:

```python
url = f"https://script.google.com/macros/s/[ID_APPS_SCRIPT]/exec?token={PASSWORD}"
```

**Formato esperado en Sheets:**
```
patente | huésped | fechaIngreso | estado
ABC123  | Juan P. | 2024-02-04   | activa
AB123CD | María G.| 2024-02-05   | activa
```

## 🔧 Variables de Entorno

| Variable | Descripción |
|----------|------------|
| `PASSWORD` | Token de autenticación para túnel |
| `CAMERA_INDEX` | Índice de cámara a usar (default: 0) |
| `PADDLEOCR_HOME` | Ruta de modelos PaddleOCR |
| `FLAGS_use_cpp_extension` | Disable C++ extensions (0) |
| `PADDLE_DISABLE_CUDA` | Deshabilitar GPU (1) |

## ⚙️ Configuración OCR

### Tesseract
```python
OCR_CONFIG = "--psm 7 -c tessedit_char_whitelist=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
```
- **PSM 7:** Línea de texto única
- **Whitelist:** Solo letras mayúsculas y números

### PaddleOCR
```python
ocr = PaddleOCR(
    use_angle_cls=False,
    det=True,           # Detección de texto
    rec=True,           # Reconocimiento
    use_gpu=False,      # CPU only
    det_algorithm="DB", # Detection algorithm
    rec_algorithm="CRNN"
)
```

## 📈 Optimizaciones

### Cámara
- Iniciada **una sola vez** al arranque
- Thread-safe con `camera_lock`
- Reutilización en múltiples requests

### Procesamiento
- **Reintentos inteligentes:** Máx 20 frames por request
- **Timeout adaptativo:** 0.15s entre frames
- **Frame único:** Para `/test` y `/recibirImagen`

## 🐛 Troubleshooting

### "Cámara no disponible"
```
✓ Verificar que la cámara está conectada
✓ Cambiar CAMERA_INDEX (probar 0, 1, 2...)
✓ Cerrar otras aplicaciones que usen cámara
```

### "No se detectó patente"
```
✓ Acercar la patente a la cámara
✓ Mejorar iluminación
✓ Verificar que best.pt es válido
✓ Probar con /recibirImagen con foto clara
```

### "Error de conexión Cloudflare"
```
✓ Verificar que cloudflared.exe está en carpeta raíz
✓ Comprobar conexión a internet
✓ Verificar TOKEN es válido
✓ Revisar que backend está activo
```

### "Token inválido"
```
✓ Regenerar PASSWORD
✓ Validar que backend reconoce el token
✓ Comprobar sincronización de tokens
```

## 📦 Compilación a .EXE

Con PyInstaller:
```bash
pyinstaller --onefile --add-data "best.pt:." \
  --add-data "cloudflared.exe:." \
  --add-data "tesseract:tesseract" \
  main.py
```

La aplicación detecta automáticamente si se ejecuta desde `.exe`:
```python
if getattr(sys, 'frozen', False):
    BASE_DIR = sys._MEIPASS  # .exe
else:
    BASE_DIR = os.path.dirname(__file__)  # script
```

## 📝 Logs

La aplicación registra eventos en:
- **Console:** Logs en tiempo real
- **Queue:** Sistema `ui_queue` para UI (si existe)

Niveles:
- ✅ Éxito
- ❌ Error
- 🔍 Búsqueda
- 📷 Cámara
- 🌐 Red
- 🔐 Autenticación

## 🚀 Performance

**Tiempos típicos:**
- `/iniciar` (cámara): 0.5-3s (20 frames)
- `/buscarPatente`: 0.3-0.5s (query Google)
- `/recibirImagen`: 0.5-1.5s (imagen POST)
- `/detectarPatente`: 1-2s (descarga + OCR)

## 📞 Contacto & Support

Para reportar problemas o mejoras, revisar:
- Logs de consola para errores
- Estado del túnel Cloudflare
- Disponibilidad de modelos (best.pt, paddle_models)
- Conectividad con Google Sheets
