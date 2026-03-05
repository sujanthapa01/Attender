import * as Joi from "joi"

export const envSchima = Joi.object({
    DatabaseUrl: Joi.string().required()
})

