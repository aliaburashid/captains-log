const Log = require('../models/log.js');

const dataController = {}


dataController.index = async (req, res, next) => {
    try {
        res.locals.data.logs = await Log.find({});
        next();
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

dataController.destroy = async (req, res, next) => {
    try {
        await Log.findOneAndDelete({ '_id': req.params.id })
            .then(() => {
                next()
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

dataController.update = async (req, res, next) => {
    if (req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    } else if (req.body.shipIsBroken !== true) {
        req.body.shipIsBroken = false;
    }
    try {
        res.locals.data.logs = await Log.findOneAndUpdate({ '_id': req.params.id }, req.body, { new: true })
            .then(() => {
                next()
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

dataController.create = async (req, res, next) => {
    req.body.shipIsBroken === 'on' || req.body.shipIsBroken === true ? req.body.shipIsBroken = true : req.body.shipIsBroken = false
    try {
        res.locals.data.logs = await Log.create(req.body)
        next()
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

dataController.show = async (req, res, next) => {
    try {
        res.locals.data.logs = await Log.findById(req.params.id)
        if (!res.locals.data.logs) {
            throw new Error('No ship with that ID is in our database');
        }
        next()
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}
module.exports = dataController