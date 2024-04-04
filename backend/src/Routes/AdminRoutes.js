const express = require('express');
const router= express.Router();

const { GetAllAdmins, CreateAdmin, AdminById, UpdateAdmin, DeleteAdmin} = require('../Controllers/AdminController');

router.get('', GetAllAdmins);

router.get('/:id', AdminById);

router.post('', CreateAdmin);

router.put('/:id', UpdateAdmin);

router.delete('/:id', DeleteAdmin);

module.exports = router;