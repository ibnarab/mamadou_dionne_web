const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');

const { mongoose } = require('./db.js');
var userController = require('./controllers/userController');
var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Express body parser
app.use(express.urlencoded({ extended: true }));
// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

  

  

app.get('/',forwardAuthenticated, (req, res) => res.send('welcome'));

  


app.use('/users', userController);


app.listen(3000, () => console.log('Server started at port : 3000'));



