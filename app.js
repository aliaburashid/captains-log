const express = require('express')
const morgan = require('morgan')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const userRoutes = require('./controllers/userRoutes')
const logRouter = require('./controllers/routeController')
const app = express()

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

app.use(express.json())
// this line baically tells express: "Hey, if someone submits a form to my server, 
// please take the data from that form and put it neatly into req.body so I can use it."
// Without this line, req.body would be undefined, and your server wouldn’t know what the user submitted.
// middleware to give us the body of the request data the user filled out
app.use(express.urlencoded({ extended: true })) // req.body
app.use(methodOverride('_method'))

// This is a custom middleware that runs before every route.
// When you're separating data logic (dataController) and view rendering (viewController), 
// you need a way to share the result between them. That’s where res.locals comes in — it's 
// like a shared storage space just for that request.

app.use((req, res, next) => { // applies the logic to all incoming requests
  res.locals.data = {} // Creates a blank object on res.locals.data to store shared data
  next() // Moves on to the next middleware or route handler
})
app.use(express.static('public')) // tells to check the public file before the route 
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/log', logRouter)

module.exports = app