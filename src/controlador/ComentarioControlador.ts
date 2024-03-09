import { Request, Response } from "express";
import ComentarioDao from "../dao/ComentarioDao";

class ComentarioControlador extends ComentarioDao {
    // Metodo para listar ingredientes
    public consulta(req:Request, res:Response) {
        ComentarioControlador.consultarComentarios(res);
    };

    // Metodo para agregar ingredientes
    public agregar(req:Request, res:Response) {
        ComentarioControlador.agregarComentarios(req.body, res);
    };

    // Metodo para eliminar ingredientes, cod es el parametro a enviar
    public eliminar(req:Request, res:Response) {
        ComentarioControlador.eliminarComentarios(req.params.cod, res);
    };

    // Metodo para actualizar ingredientes, cod es el parametro a enviar
    public actualizar(req:Request, res:Response) {
        ComentarioControlador.actualizarComentarios(req.params.cod, req.body, res);
    };
};

const comentarioControlador = new ComentarioControlador();
export default comentarioControlador;