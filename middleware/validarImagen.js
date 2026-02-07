import { z } from 'zod';

// Extensiones permitidas para imágenes
const EXTENSIONES_PERMITIDAS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
const TAMAÑO_MAX = 5 * 1024 * 1024; // 5MB

// Schema de validación con Zod
const schemaImagen = z.object({
  mimetype: z.string().refine(
    (type) => EXTENSIONES_PERMITIDAS.includes(type),
    {
      message: `Formato no permitido. Acepta: ${EXTENSIONES_PERMITIDAS.join(', ')}`
    }
  ),
  size: z.number().refine(
    (size) => size <= TAMAÑO_MAX,
    {
      message: `El archivo excede el tamaño máximo de 5MB`
    }
  ),
  originalname: z.string().min(1)
});

/**
 * Valida que un archivo sea una imagen válida
 * @param {Object} file - Objeto del archivo de multer
 * @returns {Object} Resultado de Zod safeParse con { success, data, error }
 */
export function validarImagen(file) {
  return schemaImagen.safeParse({
    mimetype: file.mimetype,
    size: file.size,
    originalname: file.originalname
  });
}
