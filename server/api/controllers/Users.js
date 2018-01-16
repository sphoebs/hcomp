const Crud = require("./Crud");
const users = require("../models").users;
const app = require("../../app").app;




/*app.use(passport.initialize());
app.use(passport.session());

//SERIALIZE USER
passport.serializeUser((user, cb) => {
  cb(null, { id: user.ID, name: user.EMAIL });
});

//DESERIALIZE USER
passport.deserializeUser((user, cb) => {
  users.findById(user.id).then(user => {
    cb(null, user);
  });
});*/

class Users extends Crud {
  constructor() {
    super(users);
    this.lastUpdated;    
  }
}
  
  

module.exports = Users;
