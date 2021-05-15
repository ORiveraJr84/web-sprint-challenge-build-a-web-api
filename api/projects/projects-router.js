// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Projects.get();
  res.status(200).json(projects);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await Projects.get(id);

  if (project === null) {
    res.status(404).json({ message: "Invalid ID." });
  } else {
    res.status(200).json(project);
  }
});

router.post("/", async (req, res) => {
  const projectBody = req.body;

  if (!projectBody.name || !projectBody.description) {
    res.status(400).json({ message: "Project body required." });
  } else {
    const newProject = await Projects.insert(projectBody);
    res.status(200).json(newProject);
  }
});

module.exports = router;
