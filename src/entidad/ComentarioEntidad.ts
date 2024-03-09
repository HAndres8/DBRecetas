export class ComentarioEntidad{
    public usuarioComentario: string;
    public claveUsuario: string;
    public nomRecetaComentario: string;
    public comentario: string;

    constructor(nomc:string, clav:string, nomrc:string, comen:string)
    {
        this.usuarioComentario = nomc;
        this.claveUsuario = clav;
        this.nomRecetaComentario = nomrc;
        this.comentario = comen;
    }
}

export default ComentarioEntidad;