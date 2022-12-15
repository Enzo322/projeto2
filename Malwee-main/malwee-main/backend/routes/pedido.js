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

        produtoPedido : Joi.array().items(Joi.object({
            fkPedido : Joi.number().required(),
            quantidade : Joi.number().required(),
            fkProduto : Joi.number().required(),
            valorUnitario : Joi.number().min(0.01).required(),
            descricao : Joi.string().min(1).max(100).required(),
            acrescimo : Joi.number().min(0.01).required(),
            desconto : Joi.number().min(0.01).required(),
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
            quantidade : produtoPedido.quantidade,
            fkProduto : produtoPedido.fkProduto,
            valorUnitario : produtoPedido.valorUnitario,
            acrescimo : produtoPedido.acrescimo,
            desconto : produtoPedido.desconto,
            total : produtoPedido.total,
            descricao : produtoPedido.descricao,
            fkPedido : pedido.idPedido
        })

        await result.save();
        resp.end();
}});


knl.get('pedido', async(req, resp) => {
    let user = await knl.sequelize().models.Pedido.findAll({
        where:{
            fkEndereco: {
                [Op.ne]: 0
            }
        }});
    user = knl.objects.copy(user);

    if (!knl.objects.isEmptyArray(user)){
        for(const pedido of user){
            const produtoPedido = await knl.sequelize().models.Produto_pedido.findAll({
                where : {
                    fkPedido: pedido.idPedido
                }
            })
            if (!knl.objects.isEmptyArray(produtoPedido)){
                pedido.produtoPedido_description = produtoPedido[0].descricao
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
            fkPedido: req.params.id
        }
    });
    resp.send(user);
    resp.end();
});

knl.put('pedido', async(req,resp)=>{

    const result = await knl.sequelize().models.Pedido.update({
        
        dtEntrega : req.body.dtEntrega,
        dtEmissao : req.body.dtEmissao,
        
    },{
        where : {
            idPedido: req.body.idPedido
        }
    })    

    for (const produtoPedido of req.body.produtoPedido){
        const result = knl.sequelize().models.Produto_pedido.update({
            quantidade : produtoPedido.quantidade,
            valorUnitario : produtoPedido.valorUnitario,
            descricao : produtoPedido.descricao,
            acrescimo : produtoPedido.acrescimo,
            desconto : produtoPedido.desconto,
            total : produtoPedido.total
        },{
            where : {
                idProduto_pedido: produtoPedido.fkPedido
            }
        }); 
    }
    resp.end();
});
        
knl.patch('pedido', async(req, resp) => {
    if(req.body.idPedido == null || req.body.idPedido == undefined){
        await knl.sequelize().models.Produto_pedido.update({
            fkProduto : 0,
            where : {
                fkPedido : req.body.fkPedido,
            }
        });

    }else if(req.body.idProduto_pedido == null || req.body.idProduto_pedido == undefined){
        await knl.sequelize().models.Pedido.update({
            fkEndereco : 0
        },{
            where : {
                idPedido : req.body.idPedido,
                
            }
        });
    }
    
    resp.end();
});
