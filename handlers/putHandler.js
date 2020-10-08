const { Task } = require("../models/tasks");

const putHandler = (TaskModel, data, res, id) => { 
    let taskV = new Task(id, data.description, data.status, data.dueDate);
    for (const property in taskV) {
        if(property === undefined){
            res.writeHead(400,undefined,{'content-type': 'application/json'})
            res.end({
                code: 400,
                msg: 'Bad request'
            });
            return;
        }
    }
    TaskModel.updateOne({_id: id},data,(err)=>{
        if (err) {
            res.writeHead(400,undefined,{'content-type': 'application/json'})
            res.end({
                code: 400,
                msg: 'Bad request'
            });
        }
        else {
            res.writeHead(200,undefined,{'content-type': 'application/json'})
            res.end(JSON.stringify(taskV));
        }; 
    })
}

module.exports = {putHandler}