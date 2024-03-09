import { Request, Response } from "express";
import CategoriaDao from "../dao/CategoriaDao";

class CategoriaControlador extends CategoriaDao {
    // Metodo para listar categorias
    public consulta(req:Request, res:Response) {
        CategoriaControlador.consultarCategorias(res);
    };

    // Metodo para agregar categorias
    public agregar(req:Request, res:Response) {
        const miNombre = { nombreCategoria:req.body.nombreCategoria }
        CategoriaControlador.agregarCategorias(miNombre,req.body, res);
    };

    // Metodo para eliminar categorias, cod es el parametro a enviar
    public eliminar(req:Request, res:Response) {
        CategoriaControlador.eliminarCategorias(req.params.cod, res);
    };

    // Metodo para actualizar categorias, cod es el parametro a enviar
    public actualizar(req:Request, res:Response) {
        CategoriaControlador.actualizarCategorias(req.params.cod, req.body, res);
    };
};

const categoriaControlador = new CategoriaControlador();
export default categoriaControlador;