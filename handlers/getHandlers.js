const getAllTasks = (taskModel, res) => {
    taskModel.find({}, (err, tasks) => {
        if (err) {
            console.log(err);
            res.writeHead(400,undefined,{'content-type': 'application/json'})
            res.end({
                code: 400,
                msg: 'Bad request'
            });
        } else {
            res.writeHead(200,undefined,{'content-type': 'application/json'});
            res.end(JSON.stringify(tasks));
        }
    })
}

//despues
const getOneTask = (taskModel, res, id) => {
    taskModel.findById(id, (err, tasks) => {
        if (err) {
            console.log(err);
            res.writeHead(400,undefined,{'content-type': 'application/json'})
            res.end({
                code: 400,
                msg: 'Bad request'
            });
        } else {
            res.writeHead(200,undefined,{'content-type': 'application/json'});
            res.end(JSON.stringify(tasks));
        }
    })
}

module.exports = {getAllTasks, getOneTask}