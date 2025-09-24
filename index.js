import express, { query } from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import path, { join } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { methods as authentication } from './public/js/authentication.controller.js';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { testConnection } from './database/connection.js';

// Cargar variables de entorno
dotenv.config();

//Constantes
const client = new MercadoPagoConfig({accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN});
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 8080;
const app = express();



//Server
app.listen(port, async () => {
  console.log(`El servidor esta corriendo en el puerto: ${port}`);
  // Probar conexión a la base de datos
  await testConnection();
});

///CONFIGURACIONES
app.use(express.static("client/media"))
app.use(express.static("public"));
app.use(bodyParser.json()); 
app.use(express.json()); // configura express para el uso de json
app.use(cookieParser()); //configura express para el uso de cookies
app.use(cors());

//Rutas

app.get("/", (req, res) => {res.sendFile(path.join(__dirname, 'client',"/client/media/index.html"));});
app.get("/login", (req, res) => {res.sendFile(path.join(__dirname, "/public/login.html"));});
app.get("/register", (req, res) => {res.sendFile(path.join(__dirname, "/public/register.html"));});
app.get('/profile',(req, res) => { res.sendFile(path.join(__dirname, '/public/profile.html')); });
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register)

//ruta mercadoPago
app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.description,
          unit_price: Number(req.body.price),
          quantity: Number(req.body.quantity),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: process.env.NODE_ENV === 'production' 
          ? `${req.protocol}://${req.get('host')}/` 
          : "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        failure: process.env.NODE_ENV === 'production' 
          ? `${req.protocol}://${req.get('host')}/` 
          : "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        pending: process.env.NODE_ENV === 'production' 
          ? `${req.protocol}://${req.get('host')}/` 
          : "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
      },
      auto_return: "approved",
    };
    
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error("Error al crear la preferencia de Mercado Pago:", error);
    
    // Verificar si es un error de token de acceso
    if (error.message && error.message.includes('access_token')) {
      return res.status(401).json({
        error: "No hay una cuenta de Mercado Pago test asociada",
        details: "Token de acceso inválido o expirado"
      });
    }
    
    res.status(500).json({
      error: "Error al crear la preferencia de pago",
      details: error.message || "Error interno del servidor"
    });
  }
});

