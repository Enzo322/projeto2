const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Produto', {
        idProduto : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        descricao : {
            type : Sequelize.STRING(60),
            allowNull : false
        },
        preco : {
            type : Sequelize.DECIMAL(10,2),
            allowNull : false
        },
        fkSubGrupo : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        fkGrupo : {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        },
        fkColecao: {
            type : Sequelize.INTEGER.UNSIGNED,
            allowNull: false
        }
        
    })
}