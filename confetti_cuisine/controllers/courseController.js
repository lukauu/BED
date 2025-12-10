"use strict";
import { Course } from "../models/course.js"

const getCourseParams = body => {
    return {
      title: body.title,
      description: body.description,
      maxStudents: body.maxStudents,
      cost: body.cost,
      prerequisites: body.prerequisites ? body.prerequisites.split(",").map(p => p.trim()) : []
    };
  };

const index = (req, res, next) => {
  Course.find()
    .then(courses => {
      res.locals.courses = courses;
      next();
    })
    .catch(error => {
      console.log(`Error fetching courses: ${error.message}`);
      next(error);
    });
};

const indexView = (req, res) => {
  res.render("courses/index");
};

const newView = (req, res) => {
  res.render("courses/new");
};

const create = (req, res, next) => {
  let courseParams = getCourseParams(req.body);
  Course.create(courseParams)
    .then(course => {
      res.locals.redirect = "/courses";
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error saving course: ${error.message}`);
      next(error);
    });
};

const redirectView = (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath !== undefined) res.redirect(redirectPath);
  else next();
};

const show = (req, res, next) => {
  let courseId = req.params.id;
  Course.findById(courseId)
    .then(course => {
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error fetching course by ID: ${error.message}`);
      next(error);
    });
};

const showView = (req, res) => {
  res.render("courses/show");
};

const edit = (req, res, next) => {
  let courseId = req.params.id;
  Course.findById(courseId)
    .then(course => {
      res.render("courses/edit", {
        course: course
      });
    })
    .catch(error => {
      console.log(`Error fetching course by ID: ${error.message}`);
      next(error);
    });
};

const update = (req, res, next) => {
  let courseId = req.params.id,
    courseParams = getCourseParams(req.body);

  Course.findByIdAndUpdate(courseId, {
    $set: courseParams
  })
    .then(course => {
      res.locals.redirect = `/courses/${courseId}`;
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error updating course by ID: ${error.message}`);
      next(error);
    });
};

const deleteRecord = (req, res, next) => {
  let courseId = req.params.id;
  Course.findByIdAndDelete(courseId)
    .then(() => {
      res.locals.redirect = "/courses";
      next();
    })
    .catch(error => {
      console.log(`Error deleting course by ID: ${error.message}`);
      next();
    });
};

export const courseController = {
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