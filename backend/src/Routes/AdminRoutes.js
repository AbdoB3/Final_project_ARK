const express = require('express');
const router= express.Router();

const { GetAllAdmins, CreateAdmin, AdminById, UpdateAdmin, DeleteAdmin} = require('../Controllers/AdminController');
const { adMed } = require('../Controllers/authController');

const {authenticateUser,authorize} = require('../middlewares/adminDocMiddleware');


router.post('/', CreateAdmin);
router.post('/login', adMed);

router.use(authenticateUser);

router.get('/', authorize(['admin']),GetAllAdmins);

router.get('/:id', authorize(['admin']),AdminById);

router.put('/:id', authorize(['admin']),UpdateAdmin);

router.delete('/:id', authorize(['admin']),DeleteAdmin);

module.exports = router;