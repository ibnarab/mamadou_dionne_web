const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user');
const { forwardAuthenticated } = require('../config/auth');


// Login Page
router.get('/connexion', forwardAuthenticated, (req, res) => res.send('connexion'));

// Register Page
router.get('/inscription', forwardAuthenticated, (req, res) => res.send
('inscription'));

// Register
router.post('/inscription', (req, res) => {
  const { login, nom, prenom, numero, localisation, password, password2, cni, dateDeliv } = req.body;
  let errors = [];

  if (!login || !nom || !prenom || !numero || !localisation || !password || !password2 || !cni || !dateDeliv) {
    errors.push({ msg: 'Remplissez tous les champs' });
  }

  if (password != password2) {
    errors.push({ msg: 'Mot de passe non identique' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Le mot de passe ne peut pas etre inférieur à 6 caractéres' });
  }

  if (errors.length > 0) {
    res.render('inscription', {
      login,
      nom,
      prenom,
      numero,
      localisation,
      password,
      password2,
      cni,
      dateDeliv
    });
  } else {
    User.findOne({ login: login }).then(user => {
      if (user) {
        errors.push({ msg: 'Ce login existe déja , veuillez choisir un autre' });
        res.render('inscription', {
            login,
            nom,
            prenom,
            numero,
            localisation,
            password,
            password2,
            cni,
            dateDeliv
        });
      } else {
        const newUser = new User({
            login,
            nom,
            prenom,
            numero,
            localisation,
            password,
            password2,
            cni,
            dateDeliv
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Vous etes inscrit , vueillez vous connecter'
                );
                res.redirect('/users/connexion');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Vous etes deconnecté');
  res.redirect('/users/connexion');
});

module.exports = router;
