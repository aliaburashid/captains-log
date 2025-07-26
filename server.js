require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Log = require('./models/log')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override') //<====== import method-override
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


// ---------------- ROUTES ---------------- //

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

// CREATE: add new log to database
app.post('/log', async (req, res) => {
    req.body.shipIsBroken = req.body.shipIsBroken === 'on';
    try {
        const createdLog = await Log.create(req.body);
        res.redirect(`/logs/${createdLog._id}`);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// SHOW: show details of one log
app.get('/logs/:id', async (req, res) => {
    try {
        const foundLog = await Log.findById(req.params.id);
        if (!foundLog) {
            throw new Error('No ship with that ID is in our database');
        }
        res.render('Logs/Show', { log: foundLog });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// LISTEN
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}!`);
});
