const express = require('express');

const router = express.Router();

const controller = require('../controllers/composeMail');

const middleWare = require('../middleware/auth');

router.post('/send-mail', middleWare.auth, controller.composeMail);

router.get('/drafts', middleWare.auth, controller.getSenderMails);

router.get('/mail-box', middleWare.auth, controller.getReceiverMails);

router.put('/mail/:id', controller.markAsRead);

module.exports = router;