const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models/User');


router.get('/', (req, res) => 
    User.findAll()
        .then(users => 
            res.render('users', {
                users
            }))
        .catch(err => console.log(err)));

router.get('/add', (req, res) => res.render('add'));

router.get('/edit/:id', (req, res) => 
    User.findByPk(parseInt(req.params.id))
        .then(user =>
            res.render('edit', {
                user
            }))
        .catch(err => console.log(err)));

router.post('/add', (req, res) => {
    let { first_name, last_name, birthday, balance, email } = req.body;
    let errors = [];

    if (!first_name || first_name.length < 2) {
        errors.push({text: 'Please add a first name!'});
    }

    if (!last_name || last_name.length < 2) {
        errors.push({text: 'Please add a last name!'});
    }

    if (!birthday || birthday.length < 10) {
        errors.push({text: 'Please add a valid birthday!'});
    }

    if (!balance) {
        errors.push({text: 'Please add a balance!'});
    }

    if (errors.length > 0) {
        res.render('add', {
            errors,
            first_name,
            last_name,
            birthday,
            balance,
            email
        });
    } else {
        User.create({
            first_name,
            last_name,
            birthday,
            balance,
            email
        })
          .then(user => res.redirect('/users'))
          .catch(err => console.log(err));
    }
});

router.post('/edit/:id', (req, res) => {
    User.findByPk(parseInt(req.params.id))
        .then(user => {
            if (!user) {
                return res.status(404).send('User with given id not found');
            }
        })

    let { first_name, last_name, birthday, balance, email } = req.body;
    let errors = [];

    if (!first_name || first_name.length < 2) {
        errors.push({text: 'Please add a first name!'});
    }

    if (!last_name || last_name.length < 2) {
        errors.push({text: 'Please add a last name!'});
    }

    if (!birthday || birthday.length < 10) {
        errors.push({text: 'Please add a valid birthday!'});
    }

    if (!balance) {
        errors.push({text: 'Please add a balance!'});
    }

    if (errors.length > 0) {
        res.render('edit', {
            errors,
            first_name,
            last_name,
            birthday,
            balance,
            email
        });
    } else {
        user.update({
            first_name,
            last_name,
            birthday,
            balance,
            email
        }, {where: {id: req.params.id}})
          .then(user => res.redirect('/users'))
          .catch(err => console.log(err));
    }
});

module.exports = router;