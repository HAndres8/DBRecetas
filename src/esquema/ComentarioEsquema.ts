import { model, Schema } from "mongoose";
import ComentarioEntidad from "../entidad/ComentarioEntidad";

const ComentarioEsquema = new Schema<ComentarioEntidad>({
    usuarioComentario: { type:String, required:true, trim:true },
    claveUsuario: { type:String, required:true, trim:true },
    nomRecetaComentario: { type:String, required:true, immutable:true },
    comentario: { type:String, required:true }
},
{ versionKey:false });

export default model("Comentario",ComentarioEsquema,"Comentario");