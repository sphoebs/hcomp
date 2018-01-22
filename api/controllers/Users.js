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
    let type = req.body.type;
    let isWriter = req.body.isWriter;
    if (type === facebookType) {
      return this.model
        .findOne({
          where: {
            facebook_id: data.id,
            email: data.email,
            img: data.picture.data.url,
            accessToken: data.accessToken,
            writer: isWriter
          }
        })
        .then(user => {
          let tmp;
          if (!user) {
            return this.model
              .create({
                facebook_id: data.id,
                email: data.email,
                img: data.picture.data.url,
                accessToken: data.accessToken,
                writer: isWriter

              })
              .then(user => {
                let tmp;
                if (!user) {
                  tmp = res.status(400).send({ message: 'Something goes wrong!' });
                }
                else {
                  let user_id = user.id;
                  tmp = res.status(200).send(JSON.stringify(user_id));
                }
                return tmp;
              })
              .catch(error => res.status(400).send(error));
          } else {
            let user_id = user.id;
            tmp = res.status(200).send(JSON.stringify(user_id));
          }
          return tmp;
        })
        .catch(error => res.status(400).send(error));
    }
    else {
      return this.model
        .findOne({
          where: {
            google_id: data.profileObj.googleId,
            email: data.profileObj.email,
            img: data.profileObj.imageUrl,
            accessToken: data.accessToken,
            writer: isWriter
          }
        })
        .then(user => {
          let tmp;
          if (!user) {
            return this.model
              .create({
                google_id: data.profileObj.googleId,
                email: data.profileObj.email,
                img: data.profileObj.imageUrl,
                accessToken: data.accessToken,
                writer: isWriter
              })
              .then(user => {
                let tmp;
                if (!user) {
                  tmp = res.status(400).send({ message: 'Something goes wrong!' });
                }
                else {
                  let user_id = user.id;
                  tmp = res.status(200).send(JSON.stringify(user_id));
                }
                return tmp;
              })
              .catch(error => res.status(400).send(error));
          } else {
            let user_id = user.id;
            tmp = res.status(200).send(JSON.stringify(user_id));
          }
          return tmp;
        })
        .catch(error => res.status(400).send(error));
    }
  }


  /*create(req, res) {
    let data = req.body.data;
    let type = req.body.type;
    let isWriter = req.body.isWriter;
    if (type === facebookType) {
      return this.model
        .findOne({
          where: {
            facebook_id: data.id
          }
        })
        .then(user => {
          let tmp;
          if (!user) {
            this.model
              .create({
                facebook_id: data.id,
                email: data.email,
                img: data.picture.data.url,
                accessToken: data.accessToken,
                writer: isWriter
              })
              .then(user => {
                let tmp;
                if (!user) {
                  tmp = res.status(400).send({ message: 'Something goes wrong!' });
                }
                else {
                  let user_id = user.id;
                  tmp = res.status(200).send(JSON.stringify(user_id));
                }
                return tmp;
              })
              .catch(error => res.status(400).send(error));
          })
    }
    else {
      console.log("tuttop è andato a buon fine");
      let user_id = user.id;
      tmp = res.status(200).send(JSON.stringify(user_id));
    }
    return tmp;
  })
      .catch(error => res.status(400).send(error));
}
    else {
  return this.model
    .findOrCreate({
      where: {
        google_id: data.profileObj.googleId,
        email: data.profileObj.email,
        img: data.profileObj.imageUrl,
        accessToken: data.accessToken,
        writer: isWriter
      }
    })
    .then(user => {
      let tmp;
      if (!user) {
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
  }*/
}


module.exports = Users;
