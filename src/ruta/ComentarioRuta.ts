import { Router } from "express";
import comentarioControlador from "../controlador/ComentarioControlador";
import seguridad from "../middleware/Seguridad";

class ComentarioRuta {
    public rutaApi:Router;

    constructor() {
        this.rutaApi = Router();
        this.configurarRutas();             // Llamar las rutas
    };

    public configurarRutas() {
        this.rutaApi.get("/listado", seguridad.analizarToken, comentarioControlador.consulta);
        this.rutaApi.post("/crear", comentarioControlador.agregar);
        this.rutaApi.delete("/eliminar/:cod", seguridad.analizarToken, comentarioControlador.eliminar);
        this.rutaApi.put("/actualizar/:cod", seguridad.analizarToken, comentarioControlador.actualizar);
    };
};

const comentarioRuta = new ComentarioRuta();
export default comentarioRuta.rutaApi;     // Devuelve la variable con todas las rutas hechas