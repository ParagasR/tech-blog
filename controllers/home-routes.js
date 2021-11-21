const router = require('express').Router();

router.get('/', (req, res) => {
    //change to get data from database blog items then pass through blog template handlebar
    res.render('temp')
})

module.exports = router;