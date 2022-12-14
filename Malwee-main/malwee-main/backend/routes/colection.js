const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize");
knl.post('colection', async(req, resp) => {
    const schema = Joi.object({
        descricao : Joi.string().min(1).max(200).required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.colecao.findAll({
        where : {
            descricao : req.body.descricao
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.colecao.build({
        descricao : req.body.descricao
    });

    await user.save();
    resp.end();
});

knl.get('colection', async(req, resp) => {
    const user = await knl.sequelize().models.colecao.findAll({
        where:{
            idColecao: {
                [Op.ne]: 0
            }
        }
    });
    resp.send(user);
    resp.end();
});

knl.delete('colection', async(req, resp) => {

    knl.sequelize().models.colecao.destroy({
        where : {
            idColecao : req.body.idColecao
        }
    });
    resp.end();
});

knl.put('colection', async(req,resp)=>{
    const result = await knl.sequelize().models.colecao.update({
        descricao  : req.body.descricao
    },{
        where : {
            idColecao : req.body.idColecao
        }
    })
    resp.send(result);
    resp.end();
});

knl.patch('colection', async(req, resp) => {
    const result = await knl.sequelize().models.colecao.update({
        idColecao : 0
    },{
        where : {
            idColecao : req.body.idColecao,
            
        }
    });
    resp.send(result)
    resp.end();
});