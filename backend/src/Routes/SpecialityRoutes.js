const express = require('express');
const router = express.Router();
const {GetAllSpecialities, GetSpecialityByName,	CreateSpeciality, UpdateSpeciality, DeleteSpeciality  } = require("../Controllers/SpecialityController");
router.get('/', GetAllSpecialities);
const {authorize} = require('../Middlewares/adminDocMiddleware');
// router.get('/', authorize(['admin']),GetAllSpecialities);


// router.get('/', authorize(['Admin']),GetAllSpecialities);
router.get('/',GetAllSpecialities);

router.post('/', authorize(['Admin']),CreateSpeciality);

router.get('/:nom', GetSpecialityByName);

router.put('/:id', authorize(['Admin']),UpdateSpeciality);

router.delete('/:id', authorize(['Admin']),DeleteSpeciality);

module.exports = router;
