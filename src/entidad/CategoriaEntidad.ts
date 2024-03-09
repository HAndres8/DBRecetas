export class CategoriaEntidad{
    public nombreCategoria: string;
    public descripcionCategoria: string;

    constructor(nomc:string, desc:string)
    {
        this.nombreCategoria = nomc;
        this.descripcionCategoria = desc;
    }
}

export default CategoriaEntidad;