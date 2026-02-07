export class ErrorImagenNoRecibida extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorImagenNoRecibida";
        this.codigoEstado = 400; // Bad Request
    }
}

export class ErrorSubidaImagenFallida extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorSubidaImagenFallida";
        this.codigoEstado = 500; // Internal Server Error
    }   
}

export class ErrorEliminacionImagenFallida extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorEliminacionImagenFallida";
        this.codigoEstado = 500; // Internal Server Error
    }
}

export class ErrorConexionCloudinary extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorConexionCloudinary";
        this.codigoEstado = 503; // Service Unavailable
    }
}
export class ErrorMulter extends Error {
  constructor(mensaje = "Error al procesar el archivo") {
    super(mensaje);
    this.name = "ErrorMulter";
    this.codigoEstado = 400;
  }
}

export class ErrorDatosInvalidos extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ErrorDatosInvalidos";
    this.codigoEstado = 400; // Bad Request
  }
}

