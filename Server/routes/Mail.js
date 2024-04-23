const express = require('express');

const router = express.Router();

const controller = require('../controllers/Mail');

const middleWare = require('../middleware/auth');

router.post('/compose', middleWare.auth, controller.composeMail);

router.get('/sent', middleWare.auth, controller.getSenderMails);

router.get('/inbox', middleWare.auth, controller.getReceiverMails);

router.put('/read/:id', controller.markAsRead);

router.delete('/delete/:id', middleWare.auth, controller.deleteMail);

module.exports = router;