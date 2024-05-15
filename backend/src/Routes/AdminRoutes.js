const express = require('express');
const router= express.Router();

const { GetAllAdmins, CreateAdmin, AdminById, UpdateAdmin, DeleteAdmin} = require('../Controllers/AdminController');
const { adMed } = require('../Controllers/authController');

const {authenticateUser,authorize} = require('../middlewares/adminDocMiddleware');


router.post('/', CreateAdmin);
router.post('/login',adMed);

router.use(authenticateUser);

router.get('/', authorize(['Admin']),GetAllAdmins);

router.get('/:id', authorize(['Admin']),AdminById);

router.put('/:id', authorize(['Admin']),UpdateAdmin);

router.delete('/:id', authorize(['Admin']),DeleteAdmin);

module.exports = router;