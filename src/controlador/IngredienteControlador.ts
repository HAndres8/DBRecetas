import { Request, Response } from "express";
import IngredienteDao from "../dao/IngredienteDao";

class IngredienteControlador extends IngredienteDao {
    // Metodo para listar ingredientes
    public consulta(req:Request, res:Response) {
        IngredienteControlador.consultarIngredientes(res);
    };

    // Metodo para agregar ingredientes
    public agregar(req:Request, res:Response) {
        const miNombre = { nombreIngrediente:req.body.nombreIngrediente }
        IngredienteControlador.agregarIngredientes(miNombre,req.body, res);
    };

    // Metodo para eliminar ingredientes, cod es el parametro a enviar
    public eliminar(req:Request, res:Response) {
        IngredienteControlador.eliminarIngredientes(req.params.cod, res);
    };

    // Metodo para actualizar ingredientes, cod es el parametro a enviar
    public actualizar(req:Request, res:Response) {
        IngredienteControlador.actualizarIngredientes(req.params.cod, req.body, res);
    };
};

const ingredienteControlador = new IngredienteControlador();
export default ingredienteControlador;