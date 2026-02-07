import {CloudinaryServicio} from "../4-cloudinary/conexion.js";
import { RespuestaCloudinary } from "../5-utilidades/respuestaCloudinary.js";
import { ErrorEliminacionImagenFallida } from "../6-errores/ErroresPersonalizados.js";
export class ModeloImagen {

    static async probarConexion() {
        return await CloudinaryServicio.pruebaConexion();
    }

    static async guardarImagen(imagenPath) {
        try {
            const resultado = await CloudinaryServicio.subirImagen(imagenPath);

            return new RespuestaCloudinary(
                resultado.secure_url,
                resultado.public_id,
                resultado.format
            );

        } catch (err) {
            throw err;
        }
    }

    static async eliminarImagen(public_id) {
        try {
            const resultado = await CloudinaryServicio.eliminarImagen(public_id);
            if (!resultado || resultado.result !== "ok") {
                throw new ErrorEliminacionImagenFallida(
                    `Cloudinary no eliminó la imagen (${resultado?.result})`
              );
            }
            
            return resultado;

        } catch (err) {
          throw new ErrorEliminacionImagenFallida(err.message);
        }
    }
}