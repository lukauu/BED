"use strict";

const index = (req, res) => {
  res.render("index");
};

const showSignUp = (req, res) => {
  res.render("contact");
};

const postedSignUpForm = (req, res) => {
  res.render("thanks");
};

export const homeController = {
  index,
  showSignUp,
  postedSignUpForm
};