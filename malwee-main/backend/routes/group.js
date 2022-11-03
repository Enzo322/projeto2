const Joi = require('joi');
const knl = require('../knl');

knl.post('group', async(req, resp) => {
    const schema = Joi.object({
        descricao : Joi.string().min(1).max(200).required()
    })

    knl.validate(req.body, schema);

    const user = knl.sequelize().models.Grupo.build({
        status : 1,
        descricao : req.body.descricao
    });

    await user.save();
    resp.end();
});

knl.get('group', async(req, resp) => {
    const user = await knl.sequelize().models.Grupo.findAll();
    resp.send(user);
    resp.end();
});


knl.delete('group', async(req, resp) => {

    knl.sequelize().models.Grupo.destroy({
        where : {
            idGrupo : req.body.idGrupo
        }
    });
    resp.end();
});


knl.put('group', async(req,resp)=>{
    const result = await knl.sequelize().models.Grupo.update({
        descricao  : req.body.descricao
    },{
        where : {
            idGrupo : req.body.idGrupo
        }
    })
    resp.send(result);
    resp.end();
});
        
knl.patch('group', async(req, resp) => {
    const result = await knl.sequelize().models.Grupo.update({
    status : 0
    },{
         where : {
            idGrupo : req.body.idGrupo,
            
        }
    });
    resp.send(result);
    resp.end();
});
    
