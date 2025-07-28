const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 🔐 Middleware to protect routes
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findOne({ _id: decoded._id });

    if (!user) throw new Error();
    req.user = user;
    next();
  } catch {
    res.status(401).send('Not authorized');
  }
};

// ✅ Render login/signup page
exports.showAuthPage = (req, res) => {
  res.render('Log/Auth');
};

// ✅ Create user (signup)
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    // Manually generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret');
    req.session.userId = user._id;

    res.redirect('/');
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send('Username or email already exists.');
    } else {
      res.status(400).send({ message: error.message });
    }
  }
};

// ✅ Log in
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send('Invalid login credentials');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid login credentials');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret');
    req.session.userId = user._id;

    res.redirect('/');
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// ✅ Update user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updated);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// ✅ Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
