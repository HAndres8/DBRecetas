import { Response } from "express";
import RecetaEsquema from "../esquema/RecetaEsquema";
import IngredienteEsquema from "../esquema/IngredienteEsquema";
import CategoriaEsquema from "../esquema/CategoriaEsquema";
import ComentarioEsquema from "../esquema/ComentarioEsquema";

class RecetaDao {
    // Crea una promesa asincrona, los resultados deben tener await
    protected static async consultarRecetas(res:Response):Promise<any> {
        try{
            const datos = await RecetaEsquema.find()
            .sort({ nombreReceta:1 })
            .populate("ingredientesReceta.ingrediente", "nombreIngrediente")
            .populate("categoriasReceta", "nombreCategoria")
            .populate("comentariosReceta", "usuarioComentario comentario")
            .exec();
    
            // Entrega los datos
            res.status(200).json(datos);
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar la receta", miError:error.message })
        }
    };

    protected static async agregarRecetas(nombre:any, parametros:any, res:Response):Promise<any> {
        // Antes de agregar se verifica
        const existe = await RecetaEsquema.findOne(nombre);     // verifica por el nombre

        if(existe){
            res.status(400).json({ rta:"La receta ya existe" });
        }else{
            const miReceta = new RecetaEsquema(parametros);
            miReceta.save()
            .then(() => {
                res.status(200).json({ rta:"Receta agregada", receta:miReceta })
            })
            .catch((error) => {
                res.status(400).json({ rta:"No se pudo agregar la receta", miError:error.message })
            });
        }
    };

    protected static async eliminarRecetas(identificador:any, res:Response):Promise<any> {
        try{
            const eli = await RecetaEsquema.findByIdAndDelete(identificador).exec();

            if(eli){
                await ComentarioEsquema.deleteMany({nomRecetaComentario: eli.nombreReceta}).exec();  // Borra sus comentarios
                res.status(200).json({ rta:"Receta eliminada", eliminado:eli })
            }else{
                res.status(400).json({ rta:"Esta receta no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo eliminar la receta", miError:error.message })
        }
    };

    protected static async actualizarRecetas(identificador:any, parametros:any, res:Response):Promise<any> {
        try{
            const actu = await RecetaEsquema.findByIdAndUpdate({_id:identificador},
                                                               {$set:parametros},
                                                               {new:true} ).exec();
            
            if(actu){
                res.status(200).json({ rta:"Receta actualizada", actualizado:actu })
            }else{
                res.status(400).json({ rta:"Esta receta no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo actualizar la receta", miError:error.message})
        }
    };



    // Otros metodos


    // Metodo que busca la receta dependiendo del nombre que se le pase
    protected static async buscarPorNombreRecetas(nombre:any, res:Response):Promise<any> {
        try{
            const datos = await RecetaEsquema.findOne({ "nombreReceta": nombre })
            .populate("ingredientesReceta.ingrediente", "nombreIngrediente")
            .populate("categoriasReceta", "nombreCategoria")
            .populate("comentariosReceta", "usuarioComentario comentario")
            .exec();

            if(datos){
                res.status(200).json(datos);
            }else{
                res.status(400).json({ rta:"Esta receta no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar la receta", miError:error.message })
        }
    }

    // Metodo que busca las recetas dependiendo de ciertos ingredientes que se dan en parametros
    protected static async buscarPorIngredientesRecetas(ingre:any[], res:Response):Promise<any> {
        try{
            const miIngre = await IngredienteEsquema.find({ "nombreIngrediente": { $in:ingre } });

            if(miIngre.length == 0){
                res.status(400).json({ rta:"Los ingredientes no existe" });
            }else{
                const idIngre = miIngre.map(obj => obj._id);        // array de ids
            
                const datos = await RecetaEsquema.find({ "ingredientesReceta.ingrediente": { $in:idIngre} })
                .populate("ingredientesReceta.ingrediente", "nombreIngrediente")
                .populate("categoriasReceta", "nombreCategoria")
                .populate("comentariosReceta", "usuarioComentario comentario")
                .exec();
                
                if(datos.length == 0){
                    res.status(400).json({ rta:"Ninguna receta tiene ese ingrediente" });
                }else{
                    res.status(200).json(datos);
                }
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar algun ingrediente", miError:error.message })
        }
    }

    // Metodo que busca las recetas dependiendo de cierta categoria
    protected static async buscarPorCategoriaRecetas(catego:any, res:Response):Promise<any> {
        try{
            const miCate = await CategoriaEsquema.findOne({ "nombreCategoria": catego });

            if(miCate){
                const datos = await RecetaEsquema.find({ "categoriasReceta": miCate?._id })
                .populate("ingredientesReceta.ingrediente", "nombreIngrediente")
                .populate("categoriasReceta", "nombreCategoria")
                .populate("comentariosReceta", "usuarioComentario comentario")
                .exec();
        
                if(datos.length == 0){
                    res.status(400).json({ rta:"Ninguna receta tiene ese categoria" });
                }else{
                    res.status(200).json(datos);
                }
            }else{
                res.status(400).json({ rta:"Esta categoria no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar la categoria", miError:error.message })
        }
    }

    // Metodo que busca las recetas dependiendo de su dificultad
    protected static async buscarPorDificultadRecetas(difi:any, res:Response):Promise<any> {
        try{
            const datos = await RecetaEsquema.find({ "dificultadReceta": difi })
            .populate("ingredientesReceta.ingrediente", "nombreIngrediente")
            .populate("categoriasReceta", "nombreCategoria")
            .populate("comentariosReceta", "usuarioComentario comentario")
            .exec();
    
            if(datos.length == 0){
                res.status(400).json({ rta:"Ninguna receta tiene ese nivel de dificultad" });
            }else{
                res.status(200).json(datos);
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar la categoria", miError:error.message })
        }
    }

    // Metodo que ordena las recetas por orden de coccion
    protected static async ordenarCoccionRecetas(res:Response):Promise<any> {
        try{
            const datos = await RecetaEsquema.find()
            .sort({ tiempoReceta:1 })
            .populate("ingredientesReceta.ingrediente", "nombreIngrediente")
            .populate("categoriasReceta", "nombreCategoria")
            .populate("comentariosReceta", "usuarioComentario comentario")
            .exec();
 
            // Entrega los datos
            res.status(200).json(datos);
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar la receta", miError:error.message })
        }
    };

    // Metodo que ordena las recetas por orden de calorias
    protected static async ordenarProteinasRecetas(res:Response):Promise<any> {
        try{
            const datos = await RecetaEsquema.find()
            .sort({ proteinaReceta:1 })
            .populate("ingredientesReceta.ingrediente", "nombreIngrediente")
            .populate("categoriasReceta", "nombreCategoria")
            .populate("comentariosReceta", "usuarioComentario comentario")
            .exec();
    
            // Entrega los datos
            res.status(200).json(datos);
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar la receta", miError:error.message })
        }
    };
};

export default RecetaDao;