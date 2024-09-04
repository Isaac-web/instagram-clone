import * as Joi from 'joi';

export const environmentsValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'testing', 'staging', 'production')
    .default('development'),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  DB_AUTO_LOAD_ENTITIES: Joi.boolean().default(false),
});
