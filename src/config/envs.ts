import 'dotenv/config';
import * as Joi from 'joi';

interface EnvsVars {
  PORT: number;
  PRODUCTS_MS_HOST: string;
  PRODUCTS_MS_PORT: number;
}

const envsSchema = Joi.object({
  PORT: Joi.number().port().required(),
  PRODUCTS_MS_HOST: Joi.string().required(),
  PRODUCTS_MS_PORT: Joi.number().port().required(),
}).unknown(true);

const validationResult = envsSchema.validate(process.env);

if (validationResult.error) {
  throw new Error(`Config validation error: ${validationResult.error.message}`);
}

const envsVars = validationResult.value as EnvsVars;

export const Envs = {
  PORT: envsVars.PORT,
  PRODUCTS_MS_HOST: envsVars.PRODUCTS_MS_HOST,
  PRODUCT_MS_PORT: envsVars.PRODUCTS_MS_PORT,
};
