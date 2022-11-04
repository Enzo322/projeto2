const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Endereco', {
        idEndereco : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        rua : {
            type : Sequelize.STRING(100),
            allowNull : false
        },
        bairro : {
            type : Sequelize.STRING(30),
            allowNull : false
        },
        cidade : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        estado : {
            type : Sequelize.STRING(20),
            allowNull : false
        },
        cep : {
            type : Sequelize.INTEGER(),
            allowNull : false
        },
        fkCliente : {
            type : Sequelize.INTEGER()
        },
        complemento : {
            type : Sequelize.STRING(100),
            allowNull : false
        },
        numero : {
            type : Sequelize.INTEGER(),
            allowNull : false
        }
    })
}