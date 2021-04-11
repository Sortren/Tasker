import Joi from '@hapi/joi';

export const registerValidation = (data) => {
    const validationSchema = Joi.object({
        username: Joi.string()
                .min(6)
                .required(),
        email: Joi.string()
                .min(6)
                .required()
                .email(),
        password: Joi.string()
                .min(6)
                .required()
    });

    //DATA VALIDATION
    return validationSchema.validate(data);   
}

