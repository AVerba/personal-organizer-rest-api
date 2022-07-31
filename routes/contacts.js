const express = require('express');

const ctrlContacts = require("../../controllers/contacts");
const {ctrlWrapper} = require("../../helpers");
const {isValidId, validation} = require("../../middlewares");
const {schemas} = require('../../models/contact')

const router = express.Router();

router.get('/', ctrlWrapper((ctrlContacts.getAll)));

router.get("/:id", isValidId, ctrlWrapper(ctrlContacts.getById));
//
router.post('/', validation(schemas.addSchema), ctrlWrapper(ctrlContacts.add));
//
router.delete('/:id',isValidId, ctrlWrapper(ctrlContacts.removeById));
//
router.put('/:contactId',isValidId, validation(schemas.addSchema), ctrlWrapper(ctrlContacts.updateById));
//
router.patch("/:id/favorite", isValidId, validation(schemas.updateFavorite), ctrlWrapper(ctrlContacts.updateFavorite));

module.exports = router;
