import joi from 'joi';

const registerSchema = joi.object({
  name: joi.string().alphanum().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  verifyPassword: joi.string().valid(joi.ref('password')).required(),
  phone: joi.string().required(),
  gender: joi.string().valid('male', 'female'),
});

const loginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});

const messageSchema = joi.object({
  message: joi.string().required(),
  receiver: joi
    .string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(), // Assuming receiver is an ObjectId
});

function getSchema(link, method) {
  if (method !== 'POST') return null;
  if (link === '/user/register') {
    return registerSchema;
  } else if (link === '/user/login') {
    return loginSchema;
  } else if (link === '/message/addmessage') {
    return messageSchema;
  }
  return null;
}

export default async function asyncverifyInput(req, res, next) {
  const schema = getSchema(req.originalUrl, req.method);

  if (!schema) {
    return res.status(404).json({ error: 'Route not found' });
  }

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
}
