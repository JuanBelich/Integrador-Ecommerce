import express, { query } from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";
import path, { join } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { methods as authentication } from './public/js/authentication.controller.js';
import bodyParser from "body-parser"

//Constantes
const client = new MercadoPagoConfig({accessToken: "TEST-8598427112739393-091023-77f6797dd4923ab9b7c83a9e446702e0-348195049"});
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = 8080;
const app = express();



//Server
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto: ${port}`);
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
        success: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        failure: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
        pending: "http://127.0.0.1:5500/E-COMMERCE2024/client/media/index.html",
      },
      auto_return: "approved",
    };
    
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});

