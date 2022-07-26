const {Schema, model} = require("mongoose");
const Joi = require('joi');
const regex = require('../helpers/regex/regex')

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {versionKey: false, timestamps: true})

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().length(10).pattern(regex.phoneRegex).required()
})

const updateFavorite=Joi.object({
    favorite:Joi.boolean().required(),
})


const schemas = {
    addSchema,
    updateFavorite
}
const Contact = model("Contacts", contactSchema)

module.exports = {
    Contact,
    schemas,
};