const express = require('express');
const webpush = require('web-push');
const router = express.Router();

const publicVapidKey = 'BEzPNFV-8NCohCWCMTePv6RPg2CpXEbkT96oV_kKrwbn8jb4bXOekSPjhqAHsfNGi9D4_tdZ90rllxcUlcakNHY';
const privateVapidKey = 'xP9WBlUyTblF_wcjeZqxTlV_kJJqceA03qiwfxY26Jg';

router.post('/', async(req, res) => {
    const subscription = req.body;
    console.log('subscription', subscription);
    res.status(201).json({ message: 'subscription received'});

    webpush.setVapidDetails('mailto:test@gmail.com', publicVapidKey, privateVapidKey);
});

module.exports = router;
