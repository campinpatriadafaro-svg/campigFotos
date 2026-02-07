
import { v2 as cloudinary } from 'cloudinary';
import{ErrorSubidaImagenFallida,ErrorEliminacionImagenFallida} from '../6-errores/ErroresPersonalizados.js';
import dotenv from "dotenv" ;
dotenv.config();




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}); 




export class CloudinaryServicio {
   static optimizar = {
        folder: 'camping', // Carpeta para organizar las imágenes
        transformation: [
            {width: 1000, crop: "scale"},
            {quality: "auto"},
            {fetch_format: "auto"}]
    };
    static async pruebaConexion() {
        try {
            const resultado = await cloudinary.api.root_folders();
            return resultado;
        } catch (error) {
            console.error("Error al conectar a Cloudinary:", error.message);
            throw new ErrorConexionCloudinary("No se pudo conectar con Cloudinary");
        }
    }
      

    static async subirImagen(urlFoto) {
        try {
            const resultado = await cloudinary.uploader.upload(urlFoto, this.optimizar);
            console.log("Foto subida:", resultado.secure_url);
            return resultado;
        }catch (error) {
            console.error("Error al subir imagen:", error.message);
            throw new ErrorSubidaImagenFallida("Error al subir la imagen a Cloudinary");
        }
    }
    static async eliminarImagen(public_id){
        try{
            const resultado= await cloudinary.uploader.destroy(public_id)
            return resultado;
        }catch(err){
            console.log(err);
            throw new ErrorEliminacionImagenFallida("Error al eliminar la imagen")  
        }
    }


}