// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", async (req, res) => {
  const actions = await Actions.get();

  res.status(200).json(actions);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const action = await Actions.get(id);

  if (action === null) {
    res.status(404).json({ message: "Invalid ID" });
  } else {
    res.status(200).json(action);
  }
});

router.post("/", async (req, res) => {
  const actionInfo = req.body;

  if (
    !actionInfo ||
    !actionInfo.project_id ||
    !actionInfo.description ||
    !actionInfo.notes
  ) {
    res
      .status(400)
      .json({ message: "Project ID, description, and notes required." });
  } else {
    const createdAction = await Actions.insert(actionInfo);
    res.status(200).json(createdAction);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (
    !changes ||
    !changes.project_id ||
    !changes.description ||
    !changes.notes
  ) {
    res
      .status(400)
      .json({ message: "Project ID, description, and notes required." });
  } else {
    const updatedAction = await Actions.update(id, changes);
    res.status(200).json(updatedAction);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedAction = await Actions.remove(id);
  console.log("deletedAction", deletedAction);

  res.status(200).json({});
});

module.exports = router;
