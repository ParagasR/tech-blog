const router = require('express').Router();
const { User } = require('../../models');

//logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'No Email in database' });
            return;
        }

        const checkPassword = await dbUserData.checkPassword(req.body.password);

        if (!checkPassword) {
            res.status(400).json({ message: 'Incorrent pairing of email and password. Please try again' });
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedUser = dbUserData.id;
            console.log(req.session.cookie);
            res.status(200).json({ user: dbUserData, message: 'Login Successful' });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

//create user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            user: req.body.user,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.loggedUser = dbUserData.id;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})
module.exports = router;