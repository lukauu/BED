"use strict";

import express from "express";
import layouts from "express-ejs-layouts";
import methodOverride from "method-override";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import { errorController } from "./controllers/errorController.js";
import { homeController } from "./controllers/homeController.js";
import { courseController } from "./controllers/courseController.js";
import { subscribersController } from "./controllers/subscriberController.js";
import { usersController } from "./controllers/usersController.js"

dotenv.config()
const app = express();
const router = express.Router();

app.use(helmet())

if (!process.env.MONGODB_URI) {
  console.error("Missing required environment variable MONGODB_URI.");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, { })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

  app.set("view engine", "ejs");
  app.set("views", "./views");
  app.set("port", process.env.PORT || 3000);
  
  app.use(
    express.urlencoded({
      extended: false
    })
  );

  app.use(
    methodOverride("_method", {
      methods: ["POST", "GET"]
    })
  );

  app.use(layouts);
  app.use(express.static("public"));
  app.use(express.json());

  router.get("/", homeController.index);

router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create, usersController.redirectView);
router.get("/users/:id/edit", usersController.edit);
router.put("/users/:id/update", usersController.update, usersController.redirectView);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView);

router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.get("/subscribers/:id", subscribersController.show, subscribersController.showView);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

router.get("/courses", courseController.index, courseController.indexView);
router.get("/courses/new", courseController.new);
router.post("/courses/create", courseController.create, courseController.redirectView);
router.get("/courses/:id/edit", courseController.edit);
router.put("/courses/:id/update", courseController.update, courseController.redirectView);
router.get("/courses/:id", courseController.show, courseController.showView);
router.delete("/courses/:id/delete", courseController.delete, courseController.redirectView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

  app.use("/", router)

  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });