import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Screen from '../models/screenModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, isMasterOrAdmin } from '../utils.js';

const screenRouter = express.Router();

screenRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const master = req.query.master || '';
    const plea = req.query.plea || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const masterFilter = master ? { master } : {};
    const categoryFilter = category ? { category } : {};
    const costPerSlotFilter = min && max ? { costPerSlot: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};

    const sortPlea =
      plea === 'lowest'
        ? { costPerSlot: 1 }
        : plea === 'highest'
          ? { costPerSlot: -1 }
          : plea === 'toprated'
            ? { rating: -1 }
            : { _id: -1 };

    const countDocuments = await Screen.countDocuments({  //counting replaced in place of count from amazona tutorial [different from item=count]
      ...masterFilter,
      ...nameFilter,
      ...categoryFilter,
      ...costPerSlotFilter,
      ...ratingFilter,
    });

    const screens = await Screen.find({
      ...masterFilter,
      ...nameFilter,
      ...categoryFilter,
      ...costPerSlotFilter,
      ...ratingFilter,
    })
      .populate('master', 'master.name master.logo')
      .sort(sortPlea)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ screens, page, pages: Math.ceil(countDocuments / pageSize) });
  })
);

screenRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Screen.find().distinct('category');
    res.send(categories);
  })
);

screenRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const master = await User.findOne({ isMaster: true });
    if (master) {
      const screens = data.screens.map((screen) => ({
        ...screen,
        master: master._id,
      }));
      const createdScreens = await Screen.insertMany(screens);
      res.send({ createdScreens });
    } else {
      res.status(500).send({
        message: 'No master found. first run /api/users/seed'
      });
    }
  })
);

screenRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const screen = await Screen.findById(req.params.id).populate(
      'master',
      'master.name master.logo master.rating master.numReviews'
    );
    if (screen) {
      res.send(screen);
    } else {
      res.status(404).send({ message: 'Screen Not Found in Database' });
    }
  })
);


screenRouter.post(
  '/',
  isAuth,
  isMasterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const screen = new Screen({
      name: 'sample name' + Date.now(),
      master: req.user._id,
      image: '/images/logo.png',
      costPerSlot: 0,
      category: 'sample Category',
      slotsAvailable: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });

    const createdScreen = await screen.save();
    res.send({ message: 'Screen Created', screen: createdScreen });
  })
);


screenRouter.put(
  '/:id',
  isAuth,
  isMasterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const screenId = req.params.id;
    const screen = await Screen.findById(screenId);
    if (screen) {
      screen.name = req.body.name;
      screen.costPerSlot = req.body.costPerSlot;
      screen.image = req.body.image;
      screen.category = req.body.category;
      screen.slotsAvailable = req.body.slotsAvailable;
      screen.description = req.body.description;
      const updatedScreen = await screen.save();
      res.send({ message: 'Screen Updated', screen: updatedScreen });
    } else {
      res.status(404).send({ message: 'Screen Not Found' });
    }
  })
);


screenRouter.delete(
  '/:id',
  isAuth,
  isMasterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const screen = await Screen.findById(req.params.id);
    if (screen) {
      const deleteScreen = await screen.remove();
      res.send({
        message: 'Screen Deleted',
        screen: deleteScreen
      });
    } else {
      res.status(404).send({ message: 'Screeen Not Found' });
    }
  })
);


screenRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const screenId = req.params.id;
    const screen = await Screen.findById(screenId);
    if (screen) {
      if (screen.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      screen.reviews.push(review);
      screen.numReviews = screen.reviews.length;
      screen.rating =
        screen.reviews.reduce((a, c) => c.rating + a, 0) /
        screen.reviews.length;
      const updatedScreen = await screen.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedScreen.reviews[updatedScreen.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Screen Not Found' });
    }
  })
);



export default screenRouter;