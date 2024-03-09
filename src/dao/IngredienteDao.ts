import { Response } from "express";
import IngredienteEsquema from "../esquema/IngredienteEsquema";
import RecetaEsquema from "../esquema/RecetaEsquema";

class IngredienteDao {
    // Crea una promesa asincrona, los resultados deben tener await
    protected static async consultarIngredientes(res:Response):Promise<any> {
        try{
            const datos = await IngredienteEsquema.find().sort({ nombreIngrediente:1 });

            // Entrega los datos
            res.status(200).json(datos);
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar el ingrediente", miError:error.message })
        }
    };

    protected static async agregarIngredientes(nombre:any, parametros:any, res:Response):Promise<any> {
        // Antes de agregar se verifica
        const existe = await IngredienteEsquema.findOne(nombre);    // verifica por el nombre

        if(existe){
            res.status(400).json({ rta:"El ingrediente ya existe" });
        }else{
            const miIngrediente = new IngredienteEsquema(parametros);
            miIngrediente.save()
            .then(() => {
                res.status(200).json({ rta:"Ingrediente agregado", ingrediente:miIngrediente })
            })
            .catch((error) => {
                res.status(400).json({ rta:"No se pudo agregar el ingrediente", miError:error.message })
            });
        }
    };

    protected static async eliminarIngredientes(identificador:any, res:Response):Promise<any> {
        try{
            const eli = await IngredienteEsquema.findByIdAndDelete(identificador).exec();

            if(eli){
                await RecetaEsquema.updateMany({"ingredientesReceta.ingrediente": identificador},
                                               {$pull: {"ingredientesReceta": {ingrediente: identificador} } });

                res.status(200).json({ rta:"Ingrediente eliminado", eliminado:eli })
            }else{
                res.status(400).json({ rta:"Este ingrediente no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo eliminar el ingrediente", miError:error.message })
        }
    };

    protected static async actualizarIngredientes(identificador:any, parametros:any, res:Response):Promise<any> {
        try{
            const actu = await IngredienteEsquema.findByIdAndUpdate({_id:identificador},
                                                                    {$set:parametros},
                                                                    {new:true}).exec();
            if(actu){
                res.status(200).json({ rta:"Ingrediente actualizado", actualizado:actu })
            }else{
                res.status(400).json({ rta:"Este ingrediente no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo actualizar el ingrediente", miError:error.message })
        }
    };
};

export default IngredienteDao;