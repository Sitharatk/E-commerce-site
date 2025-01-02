import Joi from 'joi';

const joiUserSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    isBlock:Joi.boolean().default(false).required(),
    isAdmin:Joi.boolean().default(false).required()
})

const joiProductSchema=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required(),
    old_price:Joi.number(),
    // image:Joi.string(),
    category:Joi.string().required(),
    arrival: Joi.string()
    .valid("new", "old") 
    ,
    isDelete:Joi.boolean().default(false)
})

export {joiUserSchema,joiProductSchema}