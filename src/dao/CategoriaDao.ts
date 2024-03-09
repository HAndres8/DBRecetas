import { Response } from "express";
import CategoriaEsquema from "../esquema/CategoriaEsquema";

class CategoriaDao {
    // Crea una promesa asincrona, los resultados deben tener await
    protected static async consultarCategorias(res:Response):Promise<any> {
        try{
            const datos = await CategoriaEsquema.find().sort({ nombreCategoria:1 });

            // Entrega los datos
            res.status(200).json(datos)
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar la categoria", miError:error.message })
        }
    };

    protected static async agregarCategorias(nombre:any, parametros:any, res:Response):Promise<any> {
        // Antes de agregar se verifica
        const existe = await CategoriaEsquema.findOne(nombre);    // verifica por el nombre

        if(existe){
            res.status(400).json({ rta:"La categoria ya existe" })
        }else{
            const miCategoria = new CategoriaEsquema(parametros);
            miCategoria.save()
            .then(() => {
                res.status(200).json({ rta:"Categoria agregada", categoria:miCategoria })
            })
            .catch((error) => {
                res.status(400).json({ rta:"No se pudo agregar la categoria", miError:error.message })
            });
        }
    };

    protected static async eliminarCategorias(identificador:any, res:Response):Promise<any> {
        try{
            const eli = await CategoriaEsquema.findByIdAndDelete(identificador).exec();

            if(eli){
                res.status(200).json({ rta:"Categoria eliminada", eliminado:eli })
            }else{
                res.status(400).json({ rta:"Esta categoria no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo eliminar la categoria", miError:error.message })
        }
    };

    protected static async actualizarCategorias(identificador:any, parametros:any, res:Response):Promise<any> {
        try{
            const actu = await CategoriaEsquema.findByIdAndUpdate({_id:identificador},
                                                                  {$set:parametros},
                                                                  {new:true} ).exec();
            if(actu){
                res.status(200).json({ rta:"Categoria actualizada", actualizado:actu })
            }else{
                res.status(400).json({ rta:"Esta categoria no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo actualizar la categoria", miError:error.message })
        }
    };
};

export default CategoriaDao;