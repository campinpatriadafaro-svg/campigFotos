import{ModeloImagen}from "../3-modelo/modeloImagen.js"
import { Respuesta } from "../5-utilidades/respuesta.js";
import { ErrorConexionCloudinary, ErrorImagenNoRecibida, ErrorDatosInvalidos } from "../6-errores/ErroresPersonalizados.js";
import { validarImagen } from "../middleware/validarImagen.js";
import fs from "fs/promises";
export class ControladorImagen {
    static async pruebaConexion(req, res, next) {
        try {
            const resultado = await ModeloImagen.probarConexion();

            if (!resultado.accion) {
                throw new ErrorConexionCloudinary(resultado.error);
            }

            res.status(200).json(
                new Respuesta(true, "Conexión exitosa a Cloudinary")
            );

        } catch (err) {
            next(err); 
        }
    }
    static async createImagen(req, res, next) {
        try {
            if (!req.file) {
                throw new ErrorImagenNoRecibida("No se recibió ninguna imagen");
            }
            
            // Validar que sea una imagen
            // const validacion = validarImagen(req.file);
            // if (!validacion.success) {
            //     await fs.unlink(req.file.path);
            //     throw new ErrorDatosInvalidos(validacion.error.errors[0]?.message || 'Validación fallida');
            // }
            
           // se elimina -- la imagen se mantiene en cloudinary por un tiempo hasta que se elimie la url del todo  utilizamos este tiempo
            const resultado = await ModeloImagen.guardarImagen(req.file.path);
            //y eliminamos al mismo tiempo de crear.
            await fs.unlink(req.file.path);

            res.status(201).json(
        
                new Respuesta(true, "Imagen subida correctamente", resultado)
            );

        } catch (err) {
            console.log("Error en el controlador de crear imagen:", err);
            next(err); 
        }
    }
    static async eliminarImagen(req, res, next) {
        try{
            let public_id=req.body.public_id;
            if (!public_id){
                throw new ErrorImagenNoRecibida("No se recibió el public_id de la imagen a eliminar");
            }
            const resultado = await ModeloImagen.eliminarImagen(public_id);
            res.status(200).json(
                new Respuesta(true, "Imagen eliminada correctamente", resultado)
            );
        }catch(err){
            next(err);
        }
    }

}