import { model, Schema } from "mongoose";
import CategoriaEntidad from "../entidad/CategoriaEntidad";

const CategoriaEsquema = new Schema<CategoriaEntidad>({
    nombreCategoria: { type:String, required:true, unique:true, trim:true },
    descripcionCategoria: { type:String, required:true }
},
{ versionKey:false });

export default model("Categoria",CategoriaEsquema,"Categoria");