// Write your "actions" router here!
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("I've hit the actions router.");
});

module.exports = router;
