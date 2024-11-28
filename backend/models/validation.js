import Joi from 'joi';

const joiUserSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    isBlock:Joi.boolean().default(false).required(),
    isAdmin:Joi.boolean().default(false).required()
})

const joiProductSChema=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required(),
    old_price:Joi.number().required(),
    image:Joi.string().required(),
    category:Joi.string().required(),
    arrival:Joi.boolean().required(),
   
})

export {joiUserSchema,joiProductSChema}