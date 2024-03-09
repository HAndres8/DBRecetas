export class IngredienteEntidad{
    public nombreIngrediente: string;
    public caloriasIngrediente: number;

    constructor(nomi:string, cali:number)
    {
        this.nombreIngrediente = nomi;
        this.caloriasIngrediente = cali;
    }
}

export default IngredienteEntidad;