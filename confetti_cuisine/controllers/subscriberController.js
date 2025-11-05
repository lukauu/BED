"use strict";

import { Subscriber } from "../models/subscriber.js";

const getAllSubscribers  = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find();
    res.locals.subscribers = subscribers;
    next();
  } catch (error) {
    console.log(`Error fetching subscribers: ${error.message}`);
    next(error);
  }
};

const getSubscriptionPage = (req, res) => {
    res.render("contact");
};

const saveSubscriber = async (req, res) => {
    try {
        let newSubscriber = new Subscriber( {
            name: req.body.name,
            email: req.body.email,
            zipCode: Number(req.body.zipCode),
            streetAddress: req.body.streetAddress,
            vip: Boolean(req.body.vip)
        });

        await newSubscriber.save();
        res.render("thanks");

    } catch (error) {
        next(error);
    }
};

export const subscriberController = {
    getAllSubscribers,
    getSubscriptionPage,
    saveSubscriber
}
