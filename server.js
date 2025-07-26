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

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));


// ---------------- ROUTES ---------------- //

// Basic test: 
app.get('/', (req, res) => {
    res.render('Log/Home')
})

// INDEX: show all logs
app.get('/log', async (req, res) => {
    try {
        const logs = await Log.find({});
        res.render('Log/Index', { logs });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// NEW: show form to create new log
app.get('/log/new', (req, res) => {
    res.render('Log/New');
});

// EDIT: show a form to edit the item 
app.get('/log/:id/edit', async (req, res) => {
    try {
        const foundLog = await Log.findById(req.params.id)
        if (!foundLog) {
            throw new Error('No ship with that ID is in our database');
        }
        res.render('Log/Edit', {
            log: foundLog
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// CREATE: add new log to database
app.post('/log', async (req, res) => { 
    req.body.shipIsBroken === 'on' || req.body.shipIsBroken === true ? req.body.shipIsBroken = true : req.body.shipIsBroken = false
    try {
        const createdLog = await Log.create(req.body);
        res.redirect(`/log/${createdLog._id}`);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// UPDATE: save changes to the item 
app.put('/log/:id', async (req, res) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else if (req.body.shipIsBroken !== true) {
        req.body.shipIsBroken = false;
    }
    try {
        await Log.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(() => {
                res.redirect(`/log/${req.params.id}`)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// SHOW: show details of one log
app.get('/log/:id', async (req, res) => {
    try {
        const foundLog = await Log.findById(req.params.id);
        if (!foundLog) {
            throw new Error('No ship with that ID is in our database');
        }
        res.render('Log/Show', { log: foundLog });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


//  Delete: remove the item from the database 
app.delete('/log/:id', async (req, res) => {
    try{
        await Log.findOneAndDelete({'_id': req.params.id })
            .then(() => {
                res.redirect('/log')
            })
    }catch(error){
        res.status(400).send({ message: error.message })
    }
})

// LISTEN
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}!`);
});
