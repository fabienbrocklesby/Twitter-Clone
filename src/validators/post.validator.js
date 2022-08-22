import Joi from 'joi';

export default (data, required = []) => Joi.object().keys({
  title: Joi.string()
    .min(2)
    .max(240),
  body: Joi.string()
    .min(2)
    .max(240),
})
  .fork(required, (field) => field.required())
  .validateAsync(data);
