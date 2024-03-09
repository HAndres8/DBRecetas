import CategoriaEntidad from "./CategoriaEntidad";
import ComentarioEntidad from "./ComentarioEntidad";
import IngredienteEntidad from "./IngredienteEntidad";

class RecetaEntidad{

    public nombreReceta: string;
    public ingredientesReceta: IngredienteEntidad[];
    public tiempoReceta: number;
    public porcionReceta: number;
    public dificultadReceta: String;
    public proteinaReceta: number;
    public categoriasReceta: CategoriaEntidad[];
    public comentariosReceta: ComentarioEntidad[];

    constructor(nomr:string, ingr:IngredienteEntidad[], tiem:number, porc:number, difi:String,
                prot:number, cate:CategoriaEntidad[], come:ComentarioEntidad[])
    {
        this.nombreReceta = nomr;
        this.ingredientesReceta = ingr;
        this.tiempoReceta = tiem;
        this.porcionReceta = porc;
        this.dificultadReceta = difi;
        this.proteinaReceta = prot;
        this.categoriasReceta = cate;
        this.comentariosReceta = come;
    }
}

export default RecetaEntidad;