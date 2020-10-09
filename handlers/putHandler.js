const {errorResponse, objectResponse} = require('../utility/responses');
const {updateLastVersion, getLastVersion} = require('../utility/versions');
const { Task } = require("../models/tasks");

const putHandler = (taskModel, data, res, id) => { 
    let taskV = new Task(id, data.description, data.status, data.dueDate);

    for (const property in taskV) {
        if(taskV[property] === undefined){
            errorResponse(undefined, res, 400, 'Bad request');
            return;
        }
    }
    getLastVersion().then((version) => {
        taskModel.updateOne({_id: id}, data, (err)=>{
            if (err) errorResponse(err, res, 400, 'Bad request');
            else {
                objectResponse(res, 200, {message: 'OK'});
                updateLastVersion(version.lastVersion, version.lastId - 1);
            };
        })
    })
}

module.exports = {putHandler}