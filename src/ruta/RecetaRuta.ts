import { Router } from "express";
import recetaControlador from "../controlador/RecetaControlador";

class RecetaRuta {
    public rutaApi:Router;

    constructor() {
        this.rutaApi = Router();
        this.configurarRutas();             // Llamar las rutas
    };

    public configurarRutas() {
        this.rutaApi.get("/listado", recetaControlador.consulta);
        this.rutaApi.post("/crear", recetaControlador.agregar);
        this.rutaApi.delete("/eliminar/:cod", recetaControlador.eliminar);
        this.rutaApi.put("/actualizar/:cod", recetaControlador.actualizar);

        this.rutaApi.get("/nombre/:nom", recetaControlador.buscarPorNombre);
        this.rutaApi.get("/con-ingrediente", recetaControlador.buscarPorIngredientes);
        this.rutaApi.get("/categoria/:cate", recetaControlador.buscarPorCategoria);
        this.rutaApi.get("/dificultad/:difi", recetaControlador.buscarPorDificultad);
        this.rutaApi.get("/orden-coccion", recetaControlador.ordenCoccion);
        this.rutaApi.get("/orden-proteina", recetaControlador.ordenProteinas);
    };
};

const recetaRuta = new RecetaRuta();
export default recetaRuta.rutaApi;     // Devuelve la variable con todas las rutas hechas