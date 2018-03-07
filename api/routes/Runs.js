const controller = require("../controllers").runs;
const {
  ensureAuthorization,
  ensureAuthorizationCreator,
  ensureAuthorizationCreatorOrCollaboratorOfRun
} = require("../Utility/Utility");
module.exports = app => {
  app.post("/tasks/runs", ensureAuthorizationCreator, (req, res) => {
    controller.create(req, res);
  });

  app.get("/tasks/runs", (req, res) => {
    controller.readAll(req, res);
  });

  app.get("/tasks/runs/:id", (req, res) => {
    controller.readOne(req, res);
  });

  app.put("/tasks/runs/:id", ensureAuthorizationCreatorOrCollaboratorOfRun, (req, res) => {
    controller.update(req, res);
  });

  app.delete("/tasks/runs/:id", ensureAuthorizationCreatorOrCollaboratorOfRun, (req, res) => {
    controller.delete(req, res);
  });

  app.get("/tasks/runs/recentRuns/:id", ensureAuthorization, (req, res) => {
    controller.recentRuns(req, res);
  });

  app.patch('tasks/runs', (req,res) => {
    controller.updateAllRuns(req,res);
  })

  app.patch("/tasks/runs/:id", ensureAuthorizationCreatorOrCollaboratorOfRun, (req, res) => {
    controller.deletePhotos(req, res);
  });
};
