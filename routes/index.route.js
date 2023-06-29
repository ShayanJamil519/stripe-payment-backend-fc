const { Router } = require("express");
const router = Router();
const MainController = require("../controller/main.controller");

router.post("/stripe-checkout", MainController.stripeCheckout);

module.exports = router;
