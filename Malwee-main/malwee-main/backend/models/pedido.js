const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Pedido', {
        idPedido : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        dtEmissao : {
            type : Sequelize.DATE,
            allowNull : false
        },
        dtEntrega : {
            type : Sequelize.DATE,
            allowNull : false
        },
        fkEndereco : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        fkCliente : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        total : {
            type : Sequelize.DECIMAL(10,2),
            allowNull : false
        }
    })
}