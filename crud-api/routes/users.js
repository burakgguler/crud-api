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

router.get('/detail/:id', async (req, res) => {
    const user = await User.findByPk(parseInt(req.params.id))
  
    if (!user) {
      return res.status(404).send('User with given id not found')
    }

    res.render('detail', {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                birthday: user.birthday,
                balance: user.balance,
                email: user.email
    })
});

router.get('/add', (req, res) => res.render('add'));

router.get('/edit/:id', (req, res) => 
    User.findByPk(parseInt(req.params.id))
        .then(user =>
            res.render('edit', {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                birthday: user.birthday,
                balance: user.balance,
                email: user.email
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
            id,
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

router.post('/edit/:id', async (req, res) => { // should have been put
    const user = await User.findByPk(parseInt(req.params.id))
  
    if (!user) {
      return res.status(404).send('User with given id not found')
    }

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
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            birthday: user.birthday,
            balance: user.balance,
            email: user.email
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

router.post('/delete/:id', async (req, res) => { // should have been delete
    const user = await User.findByPk(parseInt(req.params.id))
  
    if (!user) {
      return res.status(404).send('User with given id not found')
    }

    user.destroy({where: { id: req.params.id}});
    res.redirect('/users');
});

module.exports = router;