import { Response } from "express";
import ComentarioEsquema from "../esquema/ComentarioEsquema";
import RecetaEsquema from "../esquema/RecetaEsquema";
import cifrado from "bcryptjs";
import jwt from "jsonwebtoken";

class ComentarioDao {
    // Crea una promesa asincrona, los resultados deben tener await
    protected static async consultarComentarios(res:Response):Promise<any> {
        try{
            const datos = await ComentarioEsquema.find().sort({ nombreRecetaComentario:1 });

            // Entrega los datos
            res.status(200).json(datos);
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo encontrar el comentario", miError:error.message })
        }
    };

    protected static async agregarComentarios(parametros:any, res:Response):Promise<any> {
        const nomRec = parametros.nomRecetaComentario;
        const disponible = await RecetaEsquema.findOne({ "nombreReceta": nomRec });    // si hay una receta para ese comentario

        // verifica campos del objeto que no se pueden repetir en una receta
        const existe = await ComentarioEsquema.findOne({"usuarioComentario": parametros.usuarioComentario,
                                                        "nomRecetaComentario": parametros.nomRecetaComentario,
                                                        "comentario": parametros.comentario});

        if(existe){
            res.status(400).json({ rta:"El comentario ya existe" });
        }else{
            if(disponible){
                parametros.claveUsuario = cifrado.hashSync(parametros.claveUsuario, 10);
                const miComentario = new ComentarioEsquema(parametros);
                // Agrega comentario a la receta
                RecetaEsquema.findByIdAndUpdate({_id: disponible._id},
                                                {$push: {"comentariosReceta":miComentario._id} }).exec();


                miComentario.save()
                .then(() => {
                    const misDatos = {      // datos del token, se crean aqui para mejor organizacion
                        id: miComentario._id,
                        usuario: miComentario.usuarioComentario,
                        comentario: miComentario.comentario
                    };
                    const miLlave = String(process.env.CLAVE_SECRETA);
                    const miToken = jwt.sign(misDatos,miLlave,{expiresIn: 345600});     // En 4 dias expira

                    res.status(200).json({ rta:"Comentario agregado", comentario:miComentario, token:miToken })
                })
                .catch((error) => {
                    res.status(400).json({ rta:"No se pudo agregar el comentario", miError:error.message })
                });
            }else{
                res.status(400).json({ rta:"Estas tratando de comentar una receta que no existe..." });
            }
        }
    };

    protected static async eliminarComentarios(identificador:any, res:Response):Promise<any> {
        try{
            const eli = await ComentarioEsquema.findByIdAndDelete(identificador).exec();

            if(eli){
                res.status(200).json({ rta:"Comentario eliminado", eliminado:eli })
            }else{
                res.status(400).json({ rta:"Este comentario no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo eliminar el comentario", miError:error.message })
        }
    };

    protected static async actualizarComentarios(identificador:any, parametros:any, res:Response):Promise<any> {
        const nomRec = parametros.nomRecetaComentario;
        const disponible = await RecetaEsquema.findOne({ "nombreReceta": nomRec });    // si hay una receta para ese comentario

        try{
            const actu = await ComentarioEsquema.findByIdAndUpdate({_id:identificador},
                                                                   {$set:parametros},
                                                                   {new:true}).exec();
            if(actu){
                if(disponible){
                    res.status(200).json({ rta:"Comentario actualizado", actualizado:actu })
                }else{
                    res.status(400).json({ rta:"Estas tratando de comentar una receta que no existe..." });
                }
            }else{
                res.status(400).json({ rta:"Este comentario no existe" })
            }
        }catch(error:any){
            res.status(400).json({ rta:"No se pudo actualizar el comentario", miError:error.message })
        }
    };
};

export default ComentarioDao;