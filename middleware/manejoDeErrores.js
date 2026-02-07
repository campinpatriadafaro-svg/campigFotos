
import { Respuesta } from "../5-utilidades/respuesta.js";

export function manejoDeErrores(err, req, res, next) {

  // Si es uno de TUS errores personalizados
  if (err.codigoEstado) {
    return res.status(err.codigoEstado).json(
      new Respuesta(false, err.message, null, err.name)
    );
  }

  // Error inesperado
  console.error("Error no controlado:", err);

  return res.status(500).json(
    new Respuesta(false, "Error interno del servidor", null, "ErrorInterno")
  );
}
