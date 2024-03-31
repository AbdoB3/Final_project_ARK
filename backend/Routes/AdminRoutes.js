const express = require('express');
const router= express.Router();

const { GetAllAdmins, CreateAdmin, UpdateAdmin, DeleteAdmin} = require("..Controllers/AdminController");

router.get('/admin', GetAllAdmins);

router.get('admin/:id',AdminById)

router.post('/admin', CreateAdmin);

router.put('/admin/:id', UpdateAdmin);

router.delete('/admin/:id', DeleteAdmin);

module.exports = router;