import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class Seguridad {
    public analizarToken(req:Request, res:Response, next:NextFunction) {
        if(req.headers.authorization){
            try{
                const miLlave = String(process.env.CLAVE_SECRETA);
                const token = req.headers.authorization?.split(" ")[1] as string;
                const infoComentario = jwt.verify(token,miLlave);
                
                req.body.comen = infoComentario;
                next();
            }catch(error:any){
                res.status(401).json({ rta:"El token no es correcto", miError:error.message })
            }
        }else{
            res.status(401).json({ rta:"No tienes un token..." })
        }
    }
}

const seguridad = new Seguridad();
export default seguridad;