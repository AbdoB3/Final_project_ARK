const express = require('express');
const router = express.Router();
const {GetAllSpecialities, 	CreateSpeciality, UpdateSpeciality, DeleteSpeciality  } = require("../Controllers/SpecialityController");



router.get('', GetAllSpecialities);

router.post('', CreateSpeciality);

router.put('/:id', UpdateSpeciality);

router.delete('/:id', DeleteSpeciality);

module.exports = router;
