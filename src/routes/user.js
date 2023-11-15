const userController = require("../controllers/user");
const router = require("express").Router();

router.get("/", userController.getUsers);

module.exports = router;
