const Crud = require("./Crud");
const users = require("../models").users;
const app = require("../../app").app;


const facebookType = 'facebook';


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

  create(req, res) {
    let data = req.body.data;
    let type = body.type;
    let isWriter = body.isWriter;
    if(type === facebookType){
      return user
      .create({
        facebook_id: data.id,
        email: data.email,
        img: data.picture.data.url,
        accessToken: data.accessToken,
        writer: isWriter        
      })
      .then(user => {
        let tmp;
        if (!data) {
          tmp = res.status(400).send({ message: 'Something goes wrong!' });
        }
        else {          
          let user_id = user.id;
          tmp = res.status(200).send(JSON.stringify(user_id));
        }
        return tmp;
      })
      .catch(error => res.status(400).send(error));
    }
    else {
      return user
      .create({
        google_id: data.profileObj.googleId,
        email: data.profileObj.email,
        img: data.profileObj.imageUrl, 
        accessToken: data.accessToken, 
        writer: isWriter      
      })
      .then(user => {
        let tmp;
        if (!data) {
          tmp = res.status(400).send({ message: 'Something goes wrong!' });
        }
        else {          
          let user_id = user.id;
          tmp = res.status(200).send(JSON.stringify(user_id));
        }
        return tmp;
      })
      .catch(error => res.status(400).send(error));
    }    
  }
} 
  

module.exports = Users;
