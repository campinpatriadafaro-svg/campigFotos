import jwt from "jsonwebtoken";
import { Respuesta } from "../5-utilidades/respuesta.js";

export function validarJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);
  
  if (!authHeader) {
    return res.status(401).json(
      new Respuesta(false, "Token requerido", null, "TokenFaltante")
    );
  }

  const token = authHeader.split(" ")[1];
  console.log("token:", token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload:", payload);
   // req.usuario = payload; // info del usuario disponible en la ruta
    next();
  } catch (error) {
    return res.status(401).json(
      new Respuesta(false, "Token inválido o expirado", null, "TokenInvalido")
    );
  }
}
