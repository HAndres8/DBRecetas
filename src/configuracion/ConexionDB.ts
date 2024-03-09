import { connect } from "mongoose";

const ConexionDB = () => {
    const url = String(process.env.DB_MONGO);
    connect(url)
    .then(() => {
      console.log("Estas conectado a",process.env.DB_MONGO);
    })
    .catch((miError) => {
      console.log("No encuentro a mongo", miError);
    });
};

export default ConexionDB;
