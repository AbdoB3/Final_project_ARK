const express = require('express');
const router = express.Router();
const {GetAllSpecialities, GetSpecialityByName,	CreateSpeciality, UpdateSpeciality, DeleteSpeciality  } = require("../Controllers/SpecialityController");
router.get('/', GetAllSpecialities);
const {authorize} = require('../Middlewares/adminDocMiddleware');
// router.get('/', authorize(['admin']),GetAllSpecialities);



router.post('/', authorize(['admin']),CreateSpeciality);

router.get('/:nom', GetSpecialityByName);

router.put('/:id', authorize(['admin']),UpdateSpeciality);

router.delete('/:id', authorize(['admin']),DeleteSpeciality);

module.exports = router;
