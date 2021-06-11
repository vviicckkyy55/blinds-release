import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import User from '../models/userModel.js';
import data from '../data.js';
import { generateToken, isAdmin, isAuth} from '../utils.js';

const userRouter = express.Router();

// Masters

userRouter.get(
  '/top-masters', 
  expressAsyncHandler(async (req, res) => {
  const topMasters = await User.find({ isMaster: true})
    .sort({ 'master.rating': -1 })
    .limit(3);
  res.send(topMasters);
  })
);

// seed data

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

// signin
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isMaster: user.isMaster,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalide email or password" })
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isMaster: user.isMaster,
      token: generateToken(createdUser),
    })
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isMaster) {
        user.master.name = req.body.masterName || user.master.name;
        user.master.logo = req.body.masterLogo || user.master.logo;
        user.master.image = req.body.image || user.master.image;
        user.master.description = 
          req.body.masterDescription || user.master.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isMaster: updatedUser.isMaster,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/', 
  isAuth, 
  isAdmin, 
  expressAsyncHandler(async(req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'vviicckkyy55@gmail.com') {
        res.status(400).send({
          message: "Cannot delete admin father"
        });
        return;
      }
      const deleteUser = await user.remove();
      res.send({
        message: 'User Deleted',
        user: deleteUser
      });
    } else {
      res.status(404).send({
        message: 'User not Found'
      });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isMaster = Boolean(req.body.isMaster);
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({
        message: 'User Updated', 
        user: updatedUser
      });
    } else {
      res.status(404).send({
        message: 'User Not found'
      });
    }
  })
);

export default userRouter;