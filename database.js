const { Sequelize, DataTypes } = require('sequelize');

//NUEVA INSTANCIA DE CONEXION
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    });

const conectarDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Conexion a la Base de Datos exitosa');
    } catch (error) {
        console.log('ERROR AL CONECTAR A LA BASE DE DATOS: ', error);
    }
};

module.exports = {
    sequelize,
    DataTypes,
    conectarDB
}