require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override') //<====== import method-override
const Log = require('./models/log')
const logRouter = require('./controllers/routeController')
const db = require('./models/db')
const PORT = process.env.PORT || 3000

// view engine setup
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine());

db.once('open', () => {
    console.log('connected to mongo')
})
db.on('error', (error) => {
  console.error(error.message)
})

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


app.use((req, res, next) => { // applies the logic to all incoming requests
  res.locals.data = {} // Creates a blank object on res.locals.data to store shared data
  next() // Moves on to the next middleware or route handler
})

// Basic test: 
app.get('/', (req, res) => {
    res.render('Log/Home')
})

// inject the router into the code
app.use('/log', logRouter)

// LISTEN
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}!`);
});
