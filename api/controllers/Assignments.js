const Crud = require("./Crud");
const assignments = require("../models").assignments;
const users = require("../models").users;
const runs = require("../models").runs;
const { EngEmotions } = require("../Utility/Emotions");
const {
  readQuery,
  securityControl,
  facebookType,
  googleType
} = require("../Utility/Utility");

const id_task = "id_task";
const id_runType = "id_runtype";
const id_run = "id_run";
const worker = "worker";
class Assignments extends Crud {
  constructor() {
    super(assignments);
    this.lastUpdated;
  }

  create(req, res) {
    return this.model
      .findOne({
        where: { id_worker: req.body.id_worker, id_run: req.body.id_run }
      })
      .then(assignment => {
        if (!assignment) {
          this.model
            .create(req.body)
            .then(data => res.status(200).send(JSON.stringify(data.id)))
            .catch(error => res.status(400).send(error));
        } else {
          if (!assignment.is_completed) {
            return res.status(200).send(assignment);
          } else {
            return res.status(200).send({ message: "Assignment already done" });
          }
        }
      })
      .catch(error => res.status(400).send(error));
  }

  guestMotivational(req, res) {
    return this.model
      .findAll({
        order: "createdAt DESC",
        limit: 10
      })
      .then(assignments => {
        if (!assignments) {
          res.send(404).send({ message: "Data Not found" });
        } else {
          res.send(200).send(assignments);
        }
      })
      .catch(error => res.status(400).send(error));
  }

  creatorMotivational(req, res) {}

  workerMotivational(req, res) {
    let tmp = "";
    /*
        resultobject = {i,1,n}
        i = [run,username]

        */
    let resultObject = {};
    return users
      .findOne({ where: { id: req.params.id_user } })
      .then(user => {
        if (user.access_type === facebookType) {
          FB.api(
            "/me/friends",
            { access_token: user.accessToken },
            response => {
              if (response.data) {
                console.log(response.data);
                response.data.forEach(element => {
                  users
                    .findOne({ where: { social_id: element.id } })
                    .then(user => {
                      this.model
                        .findAll({
                          group: { id_worker: user.id },
                          order: "createdAt DESC",
                          limit: 1
                        })
                        .then(assignment => {
                          runs
                            .findOne({
                              where: { id: assignment.id_run }
                            })
                            .then(run => {
                              //TODO ADD ON AN ARRAY WITH USER NAME
                            })
                            .catch(
                              error => (tmp = res.status(400).send(error))
                            );
                        })
                        .catch(error => (tmp = res.status(400).send(error)));
                    })
                    .catch(error => (tmp = res.status(400).send(error)));
                });
              } else {
                tmp = res.status(400).send({ message: "Something Goes Wrong" });
              }
            }
          );
        } else {
          oauth2Client.setCredentials({
            access_token: user.accessToken
          });
          plus.people.get(
            {
              userId: "me/friends",
              personFields: "emailAddresses,names",
              auth: oauth2Client
            },
            (err, response) => {
              if (err) {
                tmp = res.status(400).send({ message: "Something Goes Wrong" });
              } else {
                console.log(response.data);
                response.data.forEach(element => {
                  users
                    .findOne({ where: { social_id: element.id } })
                    .then(user => {
                      this.model
                        .findAll({
                          group: { id_worker: user.id },
                          order: "createdAt DESC",
                          limit: 1
                        })
                        .then(assignment => {
                          runs
                            .findOne({
                              where: { id: assignment.id_run }
                            })
                            .then(run => {
                              //TODO ADD ON AN ARRAY WITH USER NAME
                            })
                            .catch(
                              error => (tmp = res.status(400).send(error))
                            );
                        })
                        .catch(error => (tmp = res.status(400).send(error)));
                    })
                    .catch(error => (tmp = res.status(400).send(error)));
                });
              }
            }
          );
        }
      })
      .catch(error => (tmp = res.status(400).send(error)));
  }

  readAll(req, res) {
    let tmp = "";
    let query = req.query;
    if (query.filter && query.parameter) {
      switch (query.filter) {
        case id_task:
          return this.model
            .findAll({ where: { id_task: query.parameter } })
            .then(data => (tmp = res.status(200).send(data)))
            .catch(error => (tmp = res.status(400).send(error)));
          break;
        case id_run:
          return this.model
            .findAll({ where: { id_run: id_run } })
            .then(data => (tmp = res.status(200).send(data)))
            .catch(error => (tmp = res.status(400).send(error)));
          break;
        case worker:
          console.log(query.parameter);
          return this.model
            .findAll({ where: { id_worker: query.parameter } })
            .then(data => (tmp = res.status(200).send(data)))
            .catch(error => (tmp = res.status(400).send(error)));
          break;
        default:
          break;
      }
    } else {
      tmp = res.status(400).send({ message: "Something goes wrong" });
    }
    return tmp;
  }

  update(req, res) {
    console.log(req.body.is_completed);
    return this.model
      .findById(req.params.id)
      .then(data => {
        let tmp;
        if (!data) {
          tmp = res.status(400).send({ message: "Data not found!" });
        } else {
          let newAnswers = [];
          req.body.answers.forEach(answer => {
            newAnswers.push({
              answer: JSON.stringify(answer.answer),
              imgname: answer.imgname
            });
          });
          if (req.body.is_completed) {
            console.log("sto per entrare");
            this.populateStatistic(req.body.answers, data.id_run);
            console.log("dopo populate");
          }
          tmp = data
            .update({
              answers: newAnswers,
              is_completed: req.body.is_completed,
              is_in_progress: req.body.is_in_progress
            })
            .then(() => res.status(200).send({ message: "Data updated" }))
            .catch(error => res.status(400).send(error));
        }
        return tmp;
      })
      .catch(error => res.status(400).send(error));
  }

  populateStatistic(answers, id_run) {
    console.log("sono dentro alla funzione populate");
    console.log(id_run);
    runs
      .findById(id_run)
      .then(run => {
        //TODO: per ora funziona solo su id 7 e 8. 7 yes/no | 8 wheel
        switch (run.id_runtype) {
          case 7:
            let oldStatistics = run.statistics ? run.statistics : {};
            answers.forEach(answer => {
              let oldAnswers = "";
              if (oldStatistics[answer.imgname]!== undefined) {
                oldAnswers = JSON.parse(oldStatistics[answer.imgname]);
              } else {
                oldAnswers = {};
              }
              let yesPercentOfAnswers = oldAnswers.Yes ? oldAnswers.Yes : 0;
              let noPercentOfAnswers = oldAnswers.No ? oldAnswers.No : 0;
              let totalAnswers = oldAnswers.totalAnswers ? oldAnswers.totalAnswers : 0;
              let numberOfYes = totalAnswers > 0 ? totalAnswers * yesPercentOfAnswers / 100 : 0;
              let numberOfNo = totalAnswers > 0 ? totalAnswers * noPercentOfAnswers / 100 : 0;
              let newTotalAnswers = totalAnswers + 1;
              if (answer.answer === "Yes") {
                oldStatistics[answer.imgname] = JSON.stringify({
                  Yes: ((numberOfYes + 1) / newTotalAnswers) * 100,
                  No: numberOfNo / newTotalAnswers * 100,
                  totalAnswers: newTotalAnswers
                });
              } else {
                oldStatistics[answer.imgname] = JSON.stringify({
                  Yes: numberOfYes / newTotalAnswers * 100,
                  No: (numberOfNo + 1) / newTotalAnswers * 100,
                  totalAnswers: newTotalAnswers
                });
              }
            });
            let newStatistics = oldStatistics;
            run
              .update({
                statistics: newStatistics
              })
              .then(run => {
                console.log("EveryThing Goes Ok");
              })
              .catch(error => console.log(error));
            break;
          case 8:
          console.log("Wheel");
          let mistero = "";
          console.log(run.statistics);
          console.log(mistero);
          
          //console.log(oldStatistics);
            /*answers.forEach(answer => {
              let oldAnswers = "";
              if (oldStatistics[answer.imgname]!== undefined) {
                oldAnswers = JSON.parse(oldStatistics[answer.imgname]);
              } else {
                oldAnswers = {};
              }
              let incomingAnswers = JSON.parse(answer.answer);
              console.log(incomingAnswers);
              let totNewAnswers = oldAnswers.tot ? oldAnswers.tot + 1 : 0;
              for (var key in oldAnswers) {
                if (oldAnswers.hasOwnProperty(key)) {
                  if (incomingAnswers[key] && key !== "tot") {
                    let numbOfEmotion = oldAnswers[key] / 100 * oldAnswers[tot];
                    oldAnswers[key] =
                      (numbOfEmotion + 1) / totalNewAnswers * 100;
                  }
                }
              }
              oldAnswers[tot] = totNewAnswers;
              oldStatistics[answer.imgname] = JSON.stringify(oldAnswers);
            });/*
            let newStatistics = oldStatistics;
            run.update({
              statistics: newStatistics
            }).then(run => {
              console.log("EveryThing Goes Ok");
            })
            .catch(error => console.log(error));*/
            break;
          default:
            break;
        }
      })
      .catch(error => console.log(error));
    return;
  }
}

module.exports = Assignments;
