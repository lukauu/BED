"use strict";

import express from "express";
import layouts from "express-ejs-layouts";
import methodOverride from "method-override";
import dotenv from "dotenv";
import { errorController } from "./controllers/errorController.js";
import { homeController } from "./controllers/homeController.js";
import { courseController } from "./controllers/courseController.js";

const app = express();
const router = express.Router();

dotenv.config()
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
router.get("/contact", homeController.showSignUp);
router.post("/contact", homeController.postedSignUpForm);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router)

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});