// src/dto/createOrder.dto.ts
import Joi from 'joi';

export const createOrderSchema = Joi.object({
  size: Joi.string().required().messages({
    'string.empty': 'O tamanho da pizza é obrigatório.',
  }),
  flavor: Joi.string().required().messages({
    'string.empty': 'O sabor da pizza é obrigatório.',
  }),
  customizations: Joi.array().items(Joi.string()).optional(),
});
