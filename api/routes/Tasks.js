const controller = require("../controllers").tasks;
const {
  ensureAuthorization,
  ensureAuthorizationCreator,
  ensureAuthorizationCreatorOrCollaboratorOfTask
} = require("../Utility/Utility");
module.exports = app => {
  app.post("/tasks", ensureAuthorizationCreator, (req, res) => {
    controller.create(req, res);
  });
  app.get("/tasks", (req, res) => {
    controller.readAll(req, res);
  });

  app.get("/tasks/:id", (req, res) => {
    controller.readOne(req, res);
  });

  app.put("/tasks/:id", ensureAuthorizationCreatorOrCollaboratorOfTask,(req, res) => {
      controller.update(req, res);
    });

  app.delete("/tasks/:id", ensureAuthorizationCreatorOrCollaboratorOfTask, (req, res) => {
      controller.delete(req, res);
    });

  app.get("/tasks/creatorRecentTasks:id", ensureAuthorizationCreator, (req, res) => {
      controller.creatorRecentTasks(req, res);
    });

  app.patch("/tasks", ensureAuthorizationCreatorOrCollaboratorOfTask, (req, res) => {
      controller.deletePhoto(req, res);
    });
};
