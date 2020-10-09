const {errorResponse, objectResponse} = require('../utility/responses');

const getAllTasks = (taskModel, res) => {
    taskModel.find({}, (err, tasks) => {
        if (err) errorResponse(err, res, 400, 'Bad request');
        else objectResponse(res, 200, tasks);
    })
}

const getOneTask = (taskModel, res, id) => {
    taskModel.findById(id, (err, tasks) => {
        if (err) errorResponse(err, res, 400, 'Bad request');
        else objectResponse(res, 200, tasks);
    })
}

module.exports = {getAllTasks, getOneTask}