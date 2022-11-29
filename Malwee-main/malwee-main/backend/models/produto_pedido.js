const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Produto_pedido', {
        idProduto_pedido : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkPedido : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false
        },
        fkProduto : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false
        },
        quantidade : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull : false,
        },
        valorUnitario : {
            type : Sequelize.DECIMAL(10,2),
            allowNull : false
        },
        descricao : {
            type : Sequelize.STRING(45),
            allowNull : false
        },
        acrescimo : {
            type : Sequelize.DECIMAL(10,2),
            allowNull : false
        },
        total : {
            type : Sequelize.DECIMAL(10,2),
            allowNull : false
        }
    })
}