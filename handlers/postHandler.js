const { Task } = require("../models/tasks");

let task = "";
let taskInsert = '';

const postHandler = (ItemModel, data, res) => { 
    task = new Task(
        1,
        data.Description,
        data.Status,
        data.dueDate,
    );
    taskInsert = new ItemModel(task);
    taskInsert.save((err) => {
        if (err) {
            res.writeHead(400,undefined,{'content-type': 'application/json'})
            res.end(JSON.stringify({
                code: 400,
                msg: 'Bad request'
            }));
        }
        else {
            res.writeHead(200,undefined,{'content-type': 'application/json'})
            res.end(JSON.stringify(task));
        };
    });
}

module.exports = {postHandler}