const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize");

knl.post('pedido', async(req, resp) => {
    const schema = Joi.object({
        dtEmissao : Joi.date().raw().required(),
        dtEntrega : Joi.date().raw().required(),
        fkEndereco : Joi.number().required(),
        fkCliente : Joi.number().required(),
        total : Joi.number().min(0.01).required(),

        produtoPedido : oi.array().items(Joi.object({
            fkPedido : Joi.number().required(),
            quantidade : Joi.number().required(),
            fkProduto : Joi.number().required(),
            valorUnitario : Joi.number().min(0.01).required(),
            descricao : Joi.string().min(1).max(100).required(),
            acrescimo : Joi.number().min(0.01).required(),
            total : Joi.number().min(0.01).required()
        }))
    })

    const result = await knl.sequelize().models.Pedido.findAll({
        where : {
            dtEmissao : req.body.dtEmissao
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const pedido = knl.sequelize().models.Pedido.build({
        dtEmissao : req.body.dtEmissao,
        dtEntrega : req.body.dtEntrega,
        fkEndereco : req.body.fkEndereco,
        fkCliente : req.body.fkCliente,
        total : req.body.total
        
    });

    await pedido.save();
    for (const produtoPedido of req.body.produtoPedido){
        const result = knl.sequelize().models.Produto_pedido.build({
            fkPedido : produtoPedido.fkPedido,
            quantidade : produtoPedido.quantidade,
            fkProduto : produtoPedido.fkProduto,
            valorUnitario : produtoPedido.valorUnitario,
            descricao : produtoPedido.descricao,
            acrescimo : produtoPedido.acrescimo,
            total : produtoPedido.total
        })

        await result.save();
}});


knl.get('pedido', async(req, resp) => {
    let user = await knl.sequelize().models.Pedido.findAll({
        where:{
            idPedido: {
                [Op.ne]: 0
            }
        }});
    user = knl.objects.copy(user);

    if (!knl.objects.isEmptyArray(user)){
        for(let pedido of user){
            const produtoPedido = await knl.sequelize().models.Produto_pedido.findAll({
                where : {
                    idProduto_pedido: pedido.idProduto_pedido
                }
            })
            if (!knl.objects.isEmptyArray(produtoPedido)){
                produto.produtoPedido_description = produtoPedido[0].descricao
            }
            console.log(pedido.produtoPedido_description)

            const cliente = await knl.sequelize().models.Cliente.findAll({
                where : {
                    idCliente: pedido.fkCliente
                }
            })
            if (!knl.objects.isEmptyArray(cliente)){
                pedido.client_description = cliente[0].nomeFantasia
            }
            console.log(pedido.client_description)
    }
    
    resp.send(user);
    resp.end();

}});

knl.get('pedido/:id', async(req, resp) => {
    const user = await knl.sequelize().models.Produto_pedido.findAll({
        where: {
            fkPedido: req.params.fkPedido
        }
    });
    resp.send(user);
    resp.end();
});

knl.put('pedido', async(req,resp)=>{

    const result = await knl.sequelize().models.Pedido.update({
        dtEmissao : req.body.dtEmissao,
        dtEntrega : req.body.dtEntrega
    },{
        where : {
            idPedido: req.body.idPedido
        }
    })    

    for (const produtoPedido of req.body.produtoPedido){
        const result = knl.sequelize().models.Produto_pedido.update({
            fkPedido : produtoPedido.fkPedido,
            quantidade : produtoPedido.quantidade,
            fkProduto : produtoPedido.fkProduto,
            valorUnitario : produtoPedido.valorUnitario,
            descricao : produtoPedido.descricao,
            acrescimo : produtoPedido.acrescimo,
            total : produtoPedido.total
        },{
            where : {
                idProduto_pedido: produtoPedido.idProduto_pedido
            }
        }); 
    }
    resp.end();
});
        
knl.patch('pedido', async(req, resp) => {
    if(req.body.idPedido == null || req.body.idPedido == undefined){
        console.log(req.body.idEndereco);
        await knl.sequelize().models.Produto_pedido.destroy({
            where : {
                idProduto_pedido : req.body.idProduto_pedido,
            }
        });

    }else if(req.body.idProduto_pedido == null || req.body.idProduto_pedido == undefined){
        await knl.sequelize().models.Pedido.update({
            cnpj : 0
        },{
            where : {
                idPedido : req.body.idPedido,
                
            }
        });
    }
    
    resp.end();
});
