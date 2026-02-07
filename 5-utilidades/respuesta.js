export class Respuesta {
  constructor(exito = true, mensaje = "", datos = null, error = null) {
    this.exito = exito;
    this.mensaje = mensaje;
    this.datos = datos;
    this.error = error;
  }
}
