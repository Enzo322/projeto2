const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Endereco', {
        idEndereco : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : true
        },
        rua : {
            type : Sequelize.STRING(100),
            allowNull : true
        },
        bairro : {
            type : Sequelize.STRING(30),
            allowNull : true
        },
        cidade : {
            type : Sequelize.STRING(60),
            allowNull : true
        },
        estado : {
            type : Sequelize.STRING(20),
            allowNull : true
        },
        cep : {
            type : Sequelize.INTEGER(),
            allowNull : true
        },
        fkCliente : {
            type : Sequelize.INTEGER()
        },
        complemento : {
            type : Sequelize.STRING(100),
            allowNull : true
        },
        numero : {
            type : Sequelize.INTEGER(),
            allowNull : true
        }
    })
}