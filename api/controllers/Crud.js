// A class that implements basic CRUD operations
class Crud {
    // Takes a model parameter, which has to be one of the models defined in '../models'
    // for it to work
    constructor(model) {
      this.model = model;
    }

    // Passes a request with a JSON body containing the correct parameters to
    // create a new instance of the model through the Sequelize function create
    create(req, res) {
      return this.model
        .create(req.body)
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
    ...
}

  module.exports = Crud;
