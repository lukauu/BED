"use strict";
import { Subscriber } from "../models/subscriber.js";

const getSubscriberParams = body => {
    return {
      name: body.name,
      email: body.email,
      zipCode: parseInt(body.zipCode),
      streetAddress: body.streetAddress
    };
  };

const index = (req, res, next) => {
  Subscriber.find()
    .then(subscribers => {
      res.locals.subscribers = subscribers;
      next();
    })
    .catch(error => {
      console.log(`Error fetching subscribers: ${error.message}`);
      next(error);
    });
};

const indexView = (req, res) => {
  res.render("subscribers/index");
};

const newView = (req, res) => {
  res.render("subscribers/new");
};

const create = (req, res, next) => {
  let subscriberParams = getSubscriberParams(req.body);
  Subscriber.create(subscriberParams)
    .then(subscriber => {
      res.locals.redirect = "/subscribers";
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error saving subscriber: ${error.message}`);
      next(error);
    });
};

const redirectView = (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath !== undefined) res.redirect(redirectPath);
  else next();
};

const show = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
    .then(subscriber => {
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error fetching subscriber by ID: ${error.message}`);
      next(error);
    });
};

const showView = (req, res) => {
  res.render("subscribers/show");
};

const edit = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findById(subscriberId)
    .then(subscriber => {
      res.render("subscribers/edit", {
        subscriber: subscriber
      });
    })
    .catch(error => {
      console.log(`Error fetching subscriber by ID: ${error.message}`);
      next(error);
    });
};

const update = (req, res, next) => {
  let subscriberId = req.params.id,
    subscriberParams = getSubscriberParams(req.body);

  Subscriber.findByIdAndUpdate(subscriberId, {
    $set: subscriberParams
  })
    .then(subscriber => {
      res.locals.redirect = `/subscribers/${subscriberId}`;
      res.locals.subscriber = subscriber;
      next();
    })
    .catch(error => {
      console.log(`Error updating subscriber by ID: ${error.message}`);
      next(error);
    });
};

const deleteRecord = (req, res, next) => {
  let subscriberId = req.params.id;
  Subscriber.findByIdAndDelete(subscriberId)
    .then(() => {
      res.locals.redirect = "/subscribers";
      next();
    })
    .catch(error => {
      console.log(`Error deleting subscriber by ID: ${error.message}`);
      next();
    });
};

export const subscribersController = {
  index,
  indexView,
  new: newView,
  create,
  redirectView,
  show,
  showView,
  edit,
  update,
  delete: deleteRecord
};