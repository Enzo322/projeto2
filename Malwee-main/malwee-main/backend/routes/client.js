const { string } = require('joi');
const Joi = require('joi');
const knl = require('../knl');

knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        nomeFantasia : Joi.string().min(1).max(100).required(),
        cnpj : Joi.string().min(1).max(100).required(),
        razaoSocial : Joi.string().min(1).max(100).required(),
        dataCliente : Joi.date().raw().required(),

        address : Joi.array().items(Joi.object({
            rua : Joi.string().min(3).max(100).required(),
            bairro : Joi.string().min(2).max(30).required(),
            cidade : Joi.string().min(3).max(60).required(),
            estado : Joi.string().min(2).max(20).required(),
            cep : Joi.number().integer().required(),
            numero : Joi.number().integer().required(),
            complemento : Joi.string().min(2).max(100).required()
        }))
        
    })

    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Cliente.findAll({
        where : {
            cnpj : req.body.cnpj
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const customer = knl.sequelize().models.Cliente.build({
        nomeFantasia : req.body.nomeFantasia,
        cnpj : req.body.cnpj,
        razaoSocial : req.body.razaoSocial,
        dataCliente : req.body.dataCliente,
        
    });

    await customer.save();
    console.log(customer)
    for (const address of req.body.address){
        const result2 = knl.sequelize().models.Endereco.build({
            rua : address.rua,
            bairro : address.bairro,
            cidade : address.cidade,
            estado : address.estado,
            cep : address.cep,
            complemento : address.complemento,
            numero : address.numero,
            fkCliente : customer.idCliente
        })

        await result2.save(); 
        console.log(result2);       
    }

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
    
