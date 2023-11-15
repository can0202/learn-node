import * as controllers from "../controllers";
import express from "express";
const router = express.Router();
router.post("/register", controllers.registerController);
router.post("/login", controllers.loginController);

module.exports = router;
