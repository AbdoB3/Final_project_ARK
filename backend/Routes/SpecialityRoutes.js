const express = require('express');
const router = express.Router();
const {GetAllSpecialities, 	CreateSpeciality, UpdateSpeciality, DeleteSpeciality  } = require("../Controllers/SpecialityController");


router.get('/specialities', GetAllSpecialities);

router.post('/specialities', CreateSpeciality);

router.put('/specialities/:id', UpdateSpeciality);

router.delete('/specialities/:id', DeleteSpeciality);

module.exports = router;
