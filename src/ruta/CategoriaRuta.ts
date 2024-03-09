import { Router } from "express";
import categoriaControlador from "../controlador/CategoriaControlador";

class CategoriaRuta {
    public rutaApi:Router;

    constructor() {
        this.rutaApi = Router();
        this.configurarRutas();             // Llamar las rutas
    };

    public configurarRutas() {
        this.rutaApi.get("/listado", categoriaControlador.consulta);
        this.rutaApi.post("/crear", categoriaControlador.agregar);
        this.rutaApi.delete("/eliminar/:cod", categoriaControlador.eliminar);
        this.rutaApi.put("/actualizar/:cod", categoriaControlador.actualizar);
    };
};

const categoriaRuta = new CategoriaRuta();
export default categoriaRuta.rutaApi;     // Devuelve la variable con todas las rutas hechas