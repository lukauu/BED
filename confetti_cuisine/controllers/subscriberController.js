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
    res.render("contact")
};

const saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber( {
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });

    newSubscriber.save()
        .then(() => {
            res.render("thanks");
        })
        .catch(error => {
            res.send(error)
        })
};

export const subscriberController = {
    getAllSubscribers,
    getSubscriptionPage,
    saveSubscriber
}