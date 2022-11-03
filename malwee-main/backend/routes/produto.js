const Joi = require('joi');
const { where } = require('sequelize');
const knl = require('../knl');

knl.post('product', async(req, resp) => {
    const schema = Joi.object({
        descricao : Joi.string().min(1).max(200).required(),
        preco : Joi.number().min(0.01).required(),
        fkSubGrupo : Joi.number().integer().required(),
        fkGrupo : Joi.number().integer().required(),
        fkColecao : Joi.number().integer().required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Produto.findAll({
        where : {
            descricao : req.body.descricao
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.Produto.build({
        descricao : req.body.descricao,
        preco : req.body.preco,
        fkSubGrupo : req.body.fkSubGrupo,
        fkGrupo : req.body.fkGrupo,
        fkColecao : req.body.fkColecao
    });

    await user.save();
    resp.end();
});

knl.get('product', async(req, resp) => {
    const result = await knl.sequelize().query('select grupos.descricao as grupos, subgrupos.tipoProduto as subgrupos,  produtos.descricao, colecaos.descricao as colecaos, produtos.preco from produtos INNER JOIN colecaos on produtos.fkColecao = colecaos.idColecao INNER JOIN grupos on produtos.fkGrupo = grupos.idGrupo INNER JOIN subgrupos on produtos.fkSubGrupo = subgrupos.idSub'
    , {raw : true})
    
    console.log(result)
    resp.send(result);
    resp.end();
});


knl.delete('product', async(req, resp) => {

    knl.sequelize().models.Produto.destroy({
        where : {
            idProduto : req.body.idProduto
        }
    });
    resp.end();
});


knl.put('product', async(req,resp)=>{
    const result = await knl.sequelize().models.Produto.update({
        descricao  : req.body.descricao,
        preco : req.body.preco
    },{
        where : {
            idProduto : req.body.idProduto
        }
    })
    resp.send(result);
    resp.end();
});
        
knl.patch('product', async(req, resp) => {
    const result = await knl.sequelize().models.Produto.update({
        fkSubGrupo  : 0,
        fkGrupo : 0,
        fkColecao : 0
    },{
         where : {
            idProduto : req.body.idProduto
            
        }
    });
    resp.send(result);
    resp.end();
});
    
