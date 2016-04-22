var express = require('express');
    router = express.Router(),
    path = require('path');

router.get('/test', function (req, res) {
    res.send('Test page accessed!');
});

module.exports = router;