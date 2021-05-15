const express = require("express");
const server = express();
const helmet = require("helmet");
const ProjectsRouter = require("./projects/projects-router");
const ActionsRouter = require("./actions/actions-router");

// Configure your server here
server.use(helmet());
server.use(express.json());

server.use((req, res, next) => {
  console.log(
    `Method: ${req.method} --- URL: ${
      req.url
    } --- Time: [${new Date().toLocaleString()}]`
  );
  next();
});

// Build your actions router in /api/actions/actions-router.js
server.use("/api/actions", ActionsRouter);

// Build your projects router in /api/projects/projects-router.js
server.use("/api/projects", ProjectsRouter);
// Do NOT `server.listen()` inside this file!

module.exports = server;
