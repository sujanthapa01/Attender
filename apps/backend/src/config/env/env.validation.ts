import * as Joi from "joi"

export const envSchima = Joi.object({
    DATABASE_URL: Joi.string().required()
})

