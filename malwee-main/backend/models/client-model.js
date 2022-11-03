const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Cliente', {
        idCliente : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        nomeFantasia : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        cnpj : {
            type : Sequelize.STRING(14),
            allowNull : false
        },
        razaoSocial : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        dataCliente : {
            type : Sequelize.DATE(),
            allowNull : false
        }
    })
}