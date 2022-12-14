const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Grupo', {
        idGrupo : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        descricao : {
            type : Sequelize.STRING(200),
            allowNull : false
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}