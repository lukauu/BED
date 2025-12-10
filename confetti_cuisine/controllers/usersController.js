import { User } from "../models/user.js";

const getUserParams = body => {
    return {
      name: {
        first: body.first,
        last: body.last
      },
      email: body.email,
      password: body.password,
      zipCode: body.zipCode
    };
  };

const index = (req, res, next) => {
  User.find()
    .then(users => {
      res.locals.users = users;
      next();
    })
    .catch(error => {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
};

const indexView = (req, res) => {
  res.render("users/index");
};

const newView = (req, res) => {
  res.render("users/new");
};

const create = (req, res, next) => {
  let userParams = getUserParams(req.body);

  User.create(userParams)
    .then(user => {
      res.locals.redirect = "/users";
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
};

const redirectView = (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath !== undefined) res.redirect(redirectPath);
  else next();
};

const show = (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
    .then(user => {
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
};

const showView = (req, res) => {
  res.render("users/show");
};

const edit = (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId)
    .then(user => {
      res.render("users/edit", {
        user: user
      });
    })
    .catch(error => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
};

const update = (req, res, next) => {
  let userId = req.params.id,
    userParams = getUserParams(req.body);

  User.findByIdAndUpdate(userId, {
    $set: userParams
  })
    .then(user => {
      res.locals.redirect = `/users/${userId}`;
      res.locals.user = user;
      next();
    })
    .catch(error => {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    });
};

const deleteRecord = (req, res, next) => {
  let userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then(() => {
      res.locals.redirect = "/users";
      next();
    })
    .catch(error => {
      console.log(`Error deleting user by ID: ${error.message}`);
      next();
    });
};

export const loginPage = (req, res) => {
  res.render('login');
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Email and password are required');
      return res.render('login');
    }
    req.login(req.user, (err) => {
      if (err) {
        console.log(`Login failed: ${err.message}`);
        return res.render('login');
      }
      res.redirect('/');
    });
  } catch (error) {
    console.log(`An error occurred during login: ${error.message}`);
    res.render('login');
  }
};

export const usersController = {
  index,
  indexView,
  new: newView,
  create,
  redirectView,
  show,
  showView,
  edit,
  update,
  delete: deleteRecord,
  loginPage,
  login
};