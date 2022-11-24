const { string } = require('joi');
const Joi = require('joi');
const knl = require('../knl');
const securityConsts = require('../consts/security-consts');
const { Op } = require("sequelize");
knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        nomeFantasia : Joi.string().min(1).max(100).required(),
        cnpj : Joi.string().min(1).max(100).required(),
        razaoSocial : Joi.string().min(1).max(100).required(),
        dataCliente : Joi.date().raw().required(),

        address : Joi.array().items(Joi.object({
            logradouro : Joi.string().min(3).max(100),
            bairro : Joi.string().min(2).max(30),
            localidade : Joi.string().min(3).max(60),
            uf : Joi.string().min(2).max(20),
            cep : Joi.number().integer(),
            numero : Joi.number().integer(),
            complemento : Joi.string().min(2).max(100)
        }))
        
    })


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
            logradouro : address.logradouro,
            bairro : address.bairro,
            localidade : address.localidade,
            uf : address.uf,
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
    const user = await knl.sequelize().models.Cliente.findAll({
        where:{
            idCliente: {
                [Op.ne]: 0
            }
        }
    });
    resp.send(user);
    resp.end();
});

knl.get('client/:id', async(req, resp) => {
    const user = await knl.sequelize().models.Endereco.findAll({
        where: {
            fkCliente: req.params.id
        }
    });
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
        razaoSocial : req.body.razaoSocial
    },{
        where : {
            idCliente: req.body.idCliente
        }
    })    

    for (const address of req.body.address){
        const result2 = knl.sequelize().models.Endereco.update({
            logradouro  : address.logradouro,
            bairro      : address.bairro,
            localidade  : address.localidade,
            uf          : address.uf,
            cep         : address.cep,
            complemento : address.complemento,
            numero      : address.numero
        },{
            where : {
                idEndereco: address.idEndereco
            }
        }); 
    }
    resp.end();
});
        
knl.patch('client', async(req, resp) => {
    if(req.body.idCliente == null || req.body.idCliente == undefined){
        await knl.sequelize().models.Endereco.update({
            idEndereco : 0
            
        },{
            where : {
                idEndereco : req.body.idEndereco,
                
            }
        });

    }else if(req.body.idEndereco == null || req.body.idEndereco == undefined){
        await knl.sequelize().models.Cliente.update({
            cnpj : 0
        },{
            where : {
                idCliente : req.body.idCliente,
                
            }
        });
    }
    
    resp.end();
});
    
