const Joi = require('joi');
const knl = require('../knl');

knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        nomeFantasia : Joi.string().min(1).max(100).required(),
        cnpj : Joi.string().min(1).max(100).required(),
        razaoSocial : Joi.string().min(1).max(100).required(),
        dataCliente : Joi.date().raw().required()
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Cliente.findAll({
        where : {
            cnpj : req.body.cnpj
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const user = knl.sequelize().models.Cliente.build({
        nomeFantasia : req.body.nomeFantasia,
        cnpj : req.body.cnpj,
        razaoSocial : req.body.razaoSocial,
        dataCliente : req.body.dataCliente
    });

    await user.save();
    resp.end();
});

knl.get('client', async(req, resp) => {
    const user = await knl.sequelize().models.Cliente.findAll();
    resp.send(user);
    resp.end();
});


knl.delete('client', async(req, resp) => {

    knl.sequelize().models.Cliente.destroy({
        where : {
            idCliente : req.body.idCliente
        }
    });
    resp.end();
});


knl.put('client', async(req,resp)=>{
    const result = await knl.sequelize().models.Cliente.update({
        nomeFantasia : req.body.nomeFantasia,
        cnpj : req.body.cnpj,
        razaoSocial : req.body.razaoSocial,
        dataCliente : req.body.dataCliente
    },{
        where : {
            idCliente: req.body.idCliente
        }
    })
    resp.send(result);
    resp.end();
});
        
knl.patch('client', async(req, resp) => {
    const result = await knl.sequelize().models.Cliente.update({
        cnpj : 0
    },{
         where : {
            idCliente : req.body.idCliente,
            
        }
    });
    resp.send(result);
    resp.end();
});
    
