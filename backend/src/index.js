import { dirname, join } from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";

import { TokenValidation } from "./middlewares/Token.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

import routerUsuarios from "./routes/usuarios.routes.js";
import routerAlergias from "./routes/alergias.routes.js";
import routerAutorizacion from "./routes/autorizacion.routes.js";
import routerCodigo_medicamento from "./routes/codigo_medicamento.routes.js";
import routerDiagnostico from "./routes/diagnostico.routes.js";
import routerEstudiante from "./routes/estudiante.routes.js";
import routerHistorial from "./routes/historial.routes.js";
import routerMedicamento_dado from "./routes/medicamento_dado.routes.js";
import routerTutor from "./routes/tutor.routes.js";
import routerVisita from "./routes/visita.routes.js";

dotenv.config();
let PORT = process.env["PORT"];
let current_path = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(helmet()); //Asegura el servidor web express colocando cabeceras de respuesta HTTP

app.use(express.json()); //soporte de body JSON
app.use(cors()); //soporte de cors

//Carpeta publica: Acá va todo el frontend

app.use("/", express.static(join(current_path, "public")));

app.use(routerUsuarios); //login va primero

//start middleware
app.use(TokenValidation);

//start routes
app.use(routerAlergias);
app.use(routerAutorizacion);
app.use(routerCodigo_medicamento);
app.use(routerDiagnostico);
app.use(routerEstudiante);
app.use(routerHistorial);
app.use(routerMedicamento_dado);
app.use(routerTutor);
app.use(routerVisita);

// Middleware para rutas no encontradas (404)
app.use(notFoundHandler);

// Middleware de manejo de errores (debe ir después de todas las rutas)
app.use(errorHandler);

// Manejo de errores no controlados
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.stack || err.message);
  // Aquí podrías enviar notificaciones, cerrar conexiones de base de datos, etc.
  process.exit(1); // Detener el proceso ya que el estado es inconsistente
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason.stack || reason);
  // Aquí podrías enviar notificaciones, cerrar conexiones de base de datos, etc.
  process.exit(1); // Detener el proceso para evitar comportamiento inesperado
});

/*app.listen(PORT,()=>{
    console.log(`Servidor web escuchando en el puerto ${PORT}`)
});*/

https
  .createServer(
    {
      cert: fs.readFileSync(join(current_path, "ssl/cert.pem")),
      key: fs.readFileSync(join(current_path, "ssl/key.pem")),
    },
    app
  )
  .listen(PORT, function () {
    console.log(`Servidor HTTPS escuchando en el puerto ${PORT}`);
  });
