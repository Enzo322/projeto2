const Joi = require('joi');
const knl = require('../knl');
const { Op } = require("sequelize");
knl.post('subGroup', async(req, resp) => {
    const schema = Joi.object({
        tipoProduto : Joi.string().min(1).max(50).required(),
        fkGroup : Joi.number().required()
    })

    knl.validate(req.body, schema);

    const user = knl.sequelize().models.SubGrupo.build({
        tipoProduto : req.body.tipoProduto,
        fkGroup : req.body.fkGroup
    });

    await user.save();
    resp.end();
});

knl.get('subGroup', async(req, resp) => {
    let user = await knl.sequelize().models.SubGrupo.findAll({
        where:{
        fkGroup: {
            [Op.ne]: 0
          }
        }
    });

    user = knl.objects.copy(user);

    if (!knl.objects.isEmptyArray(user)){
        for(let subGrupo of user){
            const group = await knl.sequelize().models.Grupo.findAll({
                where : {
                    idGrupo : subGrupo.fkGroup
                }
            })

            if (!knl.objects.isEmptyArray(group)){
                subGrupo.group_description = group[0].descricao
            }

            console.log(subGrupo.group_description)
        }
    }
    resp.send(user)
    resp.end();
});


knl.delete('subGroup', async(req, resp) => {

    knl.sequelize().models.SubGrupo.destroy({
        where : {
            idSub : req.body.idSub
        }
    });
    resp.end();
});
knl.put('subGroup', async(req,resp)=>{
    const result = await knl.sequelize().models.SubGrupo.update({
        tipoProduto  : req.body.tipoProduto
    },{
        where : {
            idSub : req.body.idSub,
        }
    })
    resp.send(result);
    resp.end();
});

knl.patch('subGroup', async(req, resp) => {
    const result = await knl.sequelize().models.SubGrupo.update({
    fkGroup : 0
    },{
         where : {
            idSub : req.body.idSub,
            
        }
    });
    resp.send(result);
    resp.end();
});