import { model, Schema, Types } from "mongoose";
import RecetaEntidad from "../entidad/RecetaEntidad";

const RecetaEsquema = new Schema<RecetaEntidad>({
    nombreReceta: { type:String, required:true, unique:true, trim:true, immutable:true },
    ingredientesReceta: [{
        ingrediente: { type:Types.ObjectId, ref:"Ingrediente", required:true },
        cantidad: { type:String, required:true }
    }],                                                                                         // array de objetos
    tiempoReceta: { type:Number, required:true },
    porcionReceta: { type:Number, required:true },
    dificultadReceta: { type:String, enum:["Fácil","Intermedio","Avanzado"], required:true },     // valores permitidos con el tipo de dato
    proteinaReceta: { type:Number, required:true },
    categoriasReceta: [{ type:Types.ObjectId, ref:"Categoria", required:true }],
    comentariosReceta: [{ type:Types.ObjectId, ref:"Comentario", required:false, default:null }]
},
{ versionKey:false });

export default model("Receta",RecetaEsquema,"Receta");