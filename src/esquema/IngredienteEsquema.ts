import { model, Schema } from "mongoose";
import IngredienteEntidad from "../entidad/IngredienteEntidad";

const IngredienteEsquema = new Schema<IngredienteEntidad>({
    nombreIngrediente: { type:String, required:true, unique:true, trim:true },
    caloriasIngrediente: { type:Number, required:true }
},
{ versionKey:false });

export default model("Ingrediente",IngredienteEsquema,"Ingrediente");