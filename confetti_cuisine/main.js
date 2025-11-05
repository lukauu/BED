"use strict";

import express from "express";
import layouts from "express-ejs-layouts";
import methodOverride from "method-override";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorController } from "./controllers/errorController.js";
import { homeController } from "./controllers/homeController.js";
import { courseController } from "./controllers/courseController.js";
import { subscriberController } from "./controllers/subscriberController.js";

dotenv.config()
const app = express();
const router = express.Router();


if (!process.env.MONGODB_URL) {
  console.error("Missing required environment variable MONGODB_URI.");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URL, { })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

  app.set("view engine", "ejs");
  app.set("port", process.env.PORT || 3000);
  
  app.use(
    express.urlencoded({
      extended: false
    })
  );

  router.use(
    methodOverride("_method", {
      methods: ["POST", "GET"]
    })
  );

  router.use(layouts);
  router.use(express.static("public"));
  router.use(express.json());

  router.get("/", homeController.index)

  router.get("/courses", courseController.showCourses);
  router.get("/subscribers", subscriberController.getAllSubscribers);
  router.get("/contact", subscriberController.getSubscriptionPage);
  router.post("/subscribe", subscriberController.saveSubscriber);

  router.use(errorController.pageNotFoundError);
  router.use(errorController.internalServerError);

  app.use("/", router)

  app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });