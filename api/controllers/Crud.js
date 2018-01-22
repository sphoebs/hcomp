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
  
    // Calls the Sequelize function findAll() on this.model to find all instances of
    // the model and returns the outcome in the response object's body
    readAll(req, res) {
      return this.model
        .findAll()
        .then(data => res.status(200).send(data))
        .catch(error => res.status(400).send(error));
    }
  
    // Calls the Sequelize findById function with the required parameter contained
    // in the request parameters. If it finds something, it returns it in the
    // response object's body
    readOne(req, res) {
      return this.model
        .findById(req.params.id)
        .then(data => {
          let tmp;
          if (!data) {
            tmp = res.status(400).send({ message: 'Data not found!' });
          } else {
            tmp = res.status(200).send(data);
          }
          return tmp;
        })
        .catch(error => res.status(400).send(error));
    }
  
    // Calls the Sequelize findById function with the required parameter contained
    // in the request parameters. If it finds something,it calls the Sequelize
    // update function that updates the instance found, passing attributes and
    // values through the request's body.
    update(req, res) {
      return this.model
        .findById(req.params.id)
        .then(data => {
          let tmp;
          if (!data) {
            tmp = res.status(400).send({ message: 'Data not found!' });
          } else {
            tmp = data
              .update(req.body)
              .then(() => res.status(200).send({ message: 'Data updated' }))
              .catch(error => res.status(400).send(error));
          }
          return tmp;
        })
        .catch(error => res.status(400).send(error));
    }
  
    // Calls the Sequelize findById function with the required parameter contained
    // in the request parameters. If it finds an instance, it deletes it through the
    // destroy() Sequelize function
    delete(req, res) {
      return this.model
        .findById(req.params.id)
        .then(data => {
          if (!data) {
            return res.status(400).send({ message: 'Data not found' });
          } else {
            return data
              .destroy()
              .then(() => res.status(200).send({ message: 'Data destroyed' }))
              .catch(error => res.status(400).send(error));
          }
        })
        .catch(error => res.status(400).send(error));
    }
  }
  
  module.exports = Crud;
  