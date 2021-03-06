const {errorResponse, objectResponse} = require('../utility/responses');
const {updateLastVersion, getLastVersion} = require('../utility/versions');
const { Task } = require("../models/tasks");

const postHandler = async (taskModel, data, res) => { 
    let task = new Task(0, data.description, data.status, data.dueDate);
    getLastVersion().then((version) => {
        task._id = version.lastId;
        let taskInsert = new taskModel(task);
        taskInsert.save((err) => {
            if (err) errorResponse(err, res, 400, 'Bad request');
            else {
                updateLastVersion(version.lastVersion, version.lastId).then(()=> objectResponse(res, 200, task));
            };
        })
    });
}

module.exports = {postHandler}