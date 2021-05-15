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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  const projectToEdit = await Projects.get(id);

  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Project name and description required" });
  } else if (projectToEdit === null) {
    res.status(404).json({ messgae: "Invalid ID" });
  } else {
    const updatedProject = await Projects.update(id, changes);
    console.log(updatedProject);
    res.status(200).json(updatedProject);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const confirmation = await Projects.remove(id);

  if (confirmation === 0) {
    res.status(404).json({ message: "Invalid ID" });
  } else {
    res.status(200).json({});
  }
});

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;
  const actions = await Projects.getProjectActions(id);

  res.status(200).json(actions);
});

module.exports = router;
