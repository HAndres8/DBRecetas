import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import ConexionDB from "./ConexionDB";
import apiRecetaRuta from "../ruta/RecetaRuta";
import apiIngredienteRuta from "../ruta/IngredienteRuta";
import apiCategoriaRuta from "../ruta/CategoriaRuta";
import apiComentarioRuta from "../ruta/ComentarioRuta";

class Servidor {
    public app:express.Application;

    constructor() {
        dotenv.config({ path:"variables.env" });    // Habilitar variables de ambiente
        ConexionDB();                               // Conectarse a la base
        this.app = express();
        this.iniciarConf();
        this.iniciarRutas();
    };

    public iniciarConf() {
        this.app.set("PORT", process.env.PORT);
        this.app.use(cors());                       // Bloquear acceso
        this.app.use(morgan("dev"));                // Muestra cambios en la consola
        this.app.use(express.json({ limit:"50MB" }));
        this.app.use(express.urlencoded({ extended:true }));
    };

    public iniciarRutas() {
        this.app.use("/recetas", apiRecetaRuta);
        this.app.use("/ingredientes", apiIngredienteRuta);
        this.app.use("/categorias", apiCategoriaRuta);
        this.app.use("/comentarios", apiComentarioRuta);
    };

    public iniciarServidor() {
        this.app.listen(this.app.get("PORT"), ()=>{
            console.log("Backend listo en el puerto:", this.app.get("PORT"));
        });
    };
};

export default Servidor;