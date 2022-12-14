const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('colecao', {
        idColecao : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        descricao : {
            type : Sequelize.STRING(200),
            allowNull : false
        }
    })
}