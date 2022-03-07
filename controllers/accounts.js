const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/sayHello', (request, response) => {
    return response.status(200).json({
        message: 'Hello from KIOSK api'
    });
})

module.exports = router;