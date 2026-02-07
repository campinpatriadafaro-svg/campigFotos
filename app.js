import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rts } from './1-rutas/rutas.js';
import { manejoDeErrores } from "./middleware/manejoDeErrores.js";
// Load environment variables from .env file
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Deshabilitar X-Powered-By header
app.disable('x-powered-by');

// Configurar CORS
const corsOptions = {
  origin: process.env.ALLOWED_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', rts);

app.use(manejoDeErrores);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


