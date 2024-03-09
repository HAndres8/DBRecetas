import { Request, Response } from "express";
import RecetaDao from "../dao/RecetaDao";

class RecetaControlador extends RecetaDao {
    // Metodo para listar recetas
    public consulta(req:Request, res:Response) {
        RecetaControlador.consultarRecetas(res);
    };

    // Metodo para agregar recetas
    public agregar(req:Request, res:Response) {
        const miNombre = { nombreReceta:req.body.nombreReceta }
        RecetaControlador.agregarRecetas(miNombre, req.body, res);
    };

    // Metodo para eliminar recetas, cod es el parametro a enviar
    public eliminar(req:Request, res:Response) {
        RecetaControlador.eliminarRecetas(req.params.cod, res);
    };

    // Metodo para actualizar recetas, cod es el parametro a enviar
    public actualizar(req:Request, res:Response) {
        RecetaControlador.actualizarRecetas(req.params.cod, req.body, res);
    };



    // Otros metodos


    public buscarPorNombre(req:Request, res:Response) {
        RecetaControlador.buscarPorNombreRecetas(req.params.nom, res);
    }

    public buscarPorIngredientes(req:Request, res:Response) {
        const miIngrediente = req.query.ingredientes as string;
        const miArrayIngrediente =  miIngrediente.split(",")        // guarda los parametros en un array
        RecetaControlador.buscarPorIngredientesRecetas(miArrayIngrediente, res);
    }

    public buscarPorCategoria(req:Request, res:Response) {
        RecetaControlador.buscarPorCategoriaRecetas(req.params.cate, res);
    }

    public buscarPorDificultad(req:Request, res:Response) {
        RecetaControlador.buscarPorDificultadRecetas(req.params.difi, res);
    }

    public ordenCoccion(req:Request, res:Response) {
        RecetaControlador.ordenarCoccionRecetas(res);
    };

    public ordenProteinas(req:Request, res:Response) {
        RecetaControlador.ordenarProteinasRecetas(res);
    };
};

const recetaControlador = new RecetaControlador();
export default recetaControlador;