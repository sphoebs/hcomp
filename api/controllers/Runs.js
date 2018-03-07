const Crud = require("./Crud");
const runs = require("../models").runs;
const tasks = require("../models").tasks;
const {
  url_images,
  createData,
  tasksName,
  runsName,
  Decode
} = require("../Utility/Utility");
const aws = require("aws-sdk");
const id_task = "id_task";
const id_runType = "id_runtype";
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3 = new aws.S3({ params: { Bucket: process.env.S3_BUCKET } });

class Runs extends Crud {
  constructor() {
    super(runs);
    this.lastUpdated;
  }

  create(req, res) {
    return this.model
      .create(req.body)
      .then(data => {
        let albumKey =
          tasksName + data.id_task + "/" + runsName + data.id + "/";
        s3.headObject({ Key: albumKey }, (err, response) => {
          if (!err) {
            console.log("Album already exists.");
          }
          if (err.code !== "NotFound") {
            console.log(
              "There was an error creating your album: " + err.message
            );
          }
          s3.putObject({ Key: albumKey }, (err, response) => {
            if (err) {
              console.log(
                "There was an error creating your album: " + err.message
              );
            }
            console.log("Successfully created album.");
          });
        });
        res.status(200).send(JSON.stringify(data.id));
      })
      .catch(error => res.status(400).send(error));
  }

  readOne(req, res) {
    let query = req.query;
    switch (query.filter) {
      case "stats":
        let decodedJWT = Decode(req.headers.authorization);
        return this.model
          .findById(req.params.id)
          .then(run => {
            tasks
              .findOne({ where: { id: run.id_task } })
              .then(task => {
                if (task.collaborators.indexOf(decodedJWT.creator)) {
                  return res.status(200).send(JSON.stringify(run.statistics));
                }
              })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
        break;
      default:
        return this.model
          .findById(req.params.id)
          .then(run => {
            let tmp;
            if (!run) {
              tmp = res.status(400).send({ message: "Data not found!" });
            } else {
              tasks
                .findById(run.id_task)
                .then(task => {
                  if (!task) {
                    tmp = res.status(400).send({ message: "Data not found!" });
                  } else {
                    //ORDINO L'ARRAY PER NUMERO DI VISUALS
                    //SCELGO LE PRIME VENTI ED INCREMENTO VISUALS
                    const sortedImages = this.mergeSort(run.images);
                    const firstNImages = sortedImages.slice(0,run.max_images);
                    firstNImages.forEach(element => {
                      element.visualize = eleme.visualize + 1;
                    });
                    let payload = {
                      name: run.name,
                      description: run.description,
                      introduction: run.introduction,
                      images: firstNImages,
                      question: run.question,
                      tutorial: task.tutorial,
                      id_runtype: run.id_runtype,
                      id_task: run.id_task,
                      is_deleted: run.is_deleted,
                      is_active: run.is_active,
                      max_assignments: run.max_assignments,
                      index: run.index,
                      max_emotions: run.max_emotions,
                      max_images: run.max_images
                    };
                    tmp = res.status(200).send(JSON.stringify(payload));
                  }
                })
                .catch(error => res.status(400).send(error));
            }
            return tmp;
          })
          .catch(error => res.status(400).send(error));
        break;
    }
  }

  //TODO TRY S3 AND HOW TO WORK WITH IT
  update(req, res) {
    let imageName = req.body.imgname;
    let imageBase64 = req.body.base64;
    console.log(imageName);
    return this.model
      .findById(req.params.id)
      .then(run => {
        let tmp;
        if (!run) {
          tmp = res.status(404).send({ message: "Data not found!" });
        } else {
          if (!imageName && !imageBase64) {
            tmp = run
              .update(req.body)
              .then(() => res.status(200).send({ message: "Data updated" }))
              .catch(error => res.status(400).send(error));
          } else {
            let buf = new Buffer(
              imageBase64.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            );
            let imageKey =
              tasksName +
              run.id_task +
              "/" +
              runsName +
              run.id +
              "/" +
              imageName;
            let data = createData(buf, imageKey);
            s3.putObject(data, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                let url_image = url_images + imageKey;
                let arrayOfObjects = run.images;
                arrayOfObjects.push({
                  name: imageName,
                  url: url_image,
                  visualize: 0
                });
                tmp = run
                  .update({
                    images: arrayOfObjects
                  })
                  .then(() => res.status(200).send({ message: "Data updated" }))
                  .catch(error => {
                    console.error(error);
                    res.status(400).send(error);
                  });
              }
            });
          }
        }
        return tmp;
      })
      .catch(error => res.status(400).send(error));
  }

  recentRuns(req, res) {
    let tmp = "";
    return this.model
      .findAll({ order: "createdAt DESC", limit: 2 })
      .then(data => {
        if (!data) {
          tmp = res.status(404).send({ message: "Data Not Found" });
        } else {
          tmp = res.status(200).send(data);
        }
      })
      .catch(error => (tmp = res.status(400).send(error)));
  }

  readAll(req, res) {
    let query = req.query;
    let tmp = "";
    if (query.filter && query.parameter) {
      switch (query.filter) {
        case id_task:
          return this.model
            .findAll({ where: { id_task: query.parameter } })
            .then(data => {
              if (!data) {
                tmp = res.status(404).send({ message: "Data Not Found" });
              } else {
                tmp = res.status(200).send(data);
              }
            })
            .catch(error => (tmp = res.status(400).send(error)));
          break;

        case id_runType:
          return this.model
            .findAll({ where: { id_runtype: query.parameter } })
            .then(data => (tmp = res.status(200).send(data)))
            .catch(error => (tmp = res.status(400).send(error)));
          break;
        default:
          break;
      }
    } else {
      tmp = res.status(400).send({ message: "Something goes Wrong!" });
    }
    return tmp;
  }

  updateAllRuns(req,res) {
    this.model
    .findAll()
    .then(runs => {
      runs.forEach(run => {
        const size = run.images.length;
        console.log(size);
        run.update({
          max_images: size
        })
      })
    })
  }

  deletePhotos(req, res) {
    let tmp = "";
    return this.model
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          tmp = res.status(404).send({ message: "Data not found" });
        } else {
          if (req.body.deleteAll) {
            data
              .update({
                images: []
              })
              .then(() => {
                console.log("STO PER CANCELLARE LE IMMAGINI....");
                this.deleteAll(data.id, data.id_task);
                tmp = res.status(200).send({ message: "All images Destroyed" });
              })
              .catch(error => res.status(400).send(error));
          }
          if (req.body.imgname) {
            console.log(req.body.imgname);
            console.log("SINGLE IMAGE");
            let imageKey =
              tasksName +
              data.id_task +
              "/" +
              runsName +
              data.id +
              "/" +
              req.body.imgname;
            s3.deleteObject({ Key: imageKey }, (err, response) => {
              if (err) {
                tmp = res.status(400).send(error);
              } else {
                let images = data.images;
                let imagesFiltered = images.filter(
                  object => object.name !== req.body.imgname
                );
                delete images[req.body.imgname];
                return data
                  .update({
                    images: imagesFiltered
                  })
                  .then(
                    () =>
                      (tmp = res
                        .status(200)
                        .send({ message: "Image destroyed" }))
                  )
                  .catch(error => res.status(400).send(error));
              }
            });
          }
        }
      })
      .catch(error => res.status(400).send(error));
    return tmp;
  }

  delete(req, res) {
    this.model
      .findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({ message: "Data not found" });
        } else {
          if (Object.keys(data.images).length > 0) {
            this.deleteAll(data.id, data.id_task);
          }
          return data
            .destroy()
            .then(() => res.status(200).send({ message: "Data destroyed" }))
            .catch(error => {
              console.log(error);
              res.status(400).send(error);
            });
        }
      })
      .catch(error => res.status(400).send(error));
  }

  deleteAll(runsID, tasksID) {
    let albumKey = tasksName + tasksID + "/" + runsName + runsID + "/";
    console.log("Entro in delete ALL");
    s3.listObjects({ Prefix: albumKey }, (err, response) => {
      if (err) {
        console.log("There was an error deleting your album: ", err.message);
      }
      let objects = response.Contents.map(object => {
        return { Key: object.Key };
      });
      s3.deleteObjects(
        {
          Delete: { Objects: objects, Quiet: true }
        },
        (err, response) => {
          if (err) {
            console.log(
              "There was an error deleting your album: ",
              err.message
            );
          }
          console.log("Successfully deleted album.");
        }
      );
    });
  }

  mergeSort(arr) {
    if (arr.length === 1) {
      // return once we hit an array with a single item
      return arr;
    }

    const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
    const left = arr.slice(0, middle); // items on the left side
    const right = arr.slice(middle); // items on the right side

    return this.merge(mergeSort(left), mergeSort(right));
  }

  // compare the arrays item by item and return the concatenated result
  merge(left, right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;

    while (indexLeft < left.length && indexRight < right.length) {
      if (left[indexLeft].visualize < right[indexRight].visualize) {
        result.push(left[indexLeft]);
        indexLeft++;
      } else {
        result.push(right[indexRight]);
        indexRight++;
      }
    }

    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  }
}

module.exports = Runs;