import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Plea from '../models/pleaModel.js';
import Screen from '../models/screenModel.js';
import User from '../models/userModel.js';

import { isAdmin, isAuth, isMasterOrAdmin } from "../utils.js";

const pleaRouter = express.Router();


pleaRouter.get(
  '/', 
  isAuth, 
  isMasterOrAdmin, 
  expressAsyncHandler(async (req, res) => {

    const master = req.query.master || '';
    const masterFilter = master ? { master } : {};

    const Pleas = await Plea.find({
      ...masterFilter
    }).populate(
      'user', 
      'name'
      );
      res.send(Pleas);
  })
);

pleaRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Pleas = await Plea.find({ user: req.user._id });
    res.send(Pleas);
  })
);

pleaRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const Pleas = await Plea.aggregate([
      {
        $group: {
          _id: null,
          numPleas: { $sum: 1 },
          totalSales: { $sum: '$totalCost'},
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyPleas = await Plea.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          pleas: { $sum: 1 },
          sales: { $sum: '$totalCost'},
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const screenCategories = await Screen.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, Pleas, dailyPleas, screenCategories });
  })
  )


pleaRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.PleaAsks.length === 0) {
      res.status(400).send({
        message: 'Bucket is Empty'
      });
    } else {
      const Plea = new Plea({
        master: req.body.PleaAsks[0].master,
        PleaAsks: req.body.PleaAsks,
        completeAddress: req.body.completeAddress,
        paymentMethod: req.body.paymentMethod,
        asksCost: req.body.asksCost,
        addressCost: req.body.addressCost,
        taxCost: req.body.taxCost,
        totalCost: req.body.totalCost,
        user: req.user._id,
      });
      const createdPlea = await Plea.save();
      res.status(201).send({
        message: 'New Plea Created',
        Plea: createdPlea
      });
    }
  })
);


pleaRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async(req, res) => {
    const Plea = await Plea.findById(req.params.id);
    if(Plea) {
      res.send(Plea);
    } else {
      res.status(404).send({
        message: 'Plea Not Found'
      });
    }
  })
);


pleaRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const Plea = await Plea.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if(Plea) {
      Plea.isPaid = true;
      Plea.paidAt = Date.now();
      Plea.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedPlea = await plea.save();
      res.send({
        message: 'Plea Paid',
        Plea: updatedPlea
      });
    } else {
      res.status(404).send({
        message: 'Plea Not found'
      });
    }
  })
);



pleaRouter.delete(
  '/:id',
  isAuth,
  isMasterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const Plea = await Plea.findById(req.params.id);
    if(Plea) {
      const deletePlea = await plea.remove();
      res.send({
        message: 'Plea Deleted',
        Plea: deletePlea
      });
    } else {
      res.status(404).send({
        message: 'Plea not found'
      });
    }
  })
);


pleaRouter.put(
  '/:id/deliver',
  isAuth,
  isMasterOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const Plea = await Plea.findById(req.params.id);
    if(Plea) {
      Plea.isDelivered = true;
      Plea.deliveredAt = Date.now();

      const updatedPlea = await Plea.save();
      res.send({
        message: 'Plea Delivered',
        Plea: updatedPlea
      });
    } else {
      res.status(404).send({
        message: 'Plea not found'
      });
    }
  })
);



export default pleaRouter;