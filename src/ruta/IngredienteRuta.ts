import { Router } from "express";
import ingredienteControlador from "../controlador/IngredienteControlador";

class IngredienteRuta {
    public rutaApi:Router;

    constructor() {
        this.rutaApi = Router();
        this.configurarRutas();             // Llamar las rutas
    };

    public configurarRutas() {
        this.rutaApi.get("/listado", ingredienteControlador.consulta);
        this.rutaApi.post("/crear", ingredienteControlador.agregar);
        this.rutaApi.delete("/eliminar/:cod", ingredienteControlador.eliminar);
        this.rutaApi.put("/actualizar/:cod", ingredienteControlador.actualizar);
    };
};

const ingredienteRuta = new IngredienteRuta();
export default ingredienteRuta.rutaApi;     // Devuelve la variable con todas las rutas hechas