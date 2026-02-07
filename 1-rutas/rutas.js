import { Router } from "express";
import multer from "multer";
import { ControladorImagen } from "../2-controlador/controladorImagen.js";
import { validarJWT } from "../middleware/validarJWT.js";

export const rts= Router();
const carpetaFotosMulter= multer({dest:'uploads/'});

rts.get('/', (req, res) => {
    res.send('API funcionando');
});

rts.post('/subirImagen',validarJWT,carpetaFotosMulter.single('imagen'),ControladorImagen.createImagen);

// rts.delete('/imagenes/:public_id(*)',validarJWT,ControladorImagen.eliminarImagen);
rts.delete('/eliminarImagen', validarJWT, ControladorImagen.eliminarImagen);