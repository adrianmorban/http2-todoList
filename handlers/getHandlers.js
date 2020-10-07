const getAllTasks = (ItemModel, stream) => {
    ItemModel.find({}, (err, tasks) => {
        if (err) {
            console.log(err);
            stream.respond({
                'content-type': 'application/json',
                ':status': 400
            });
            stream.end({
                code: 400,
                msg: 'Bad request'
            });
        } else {
            stream.respond({
                'content-type': 'application/json',
                ':status': 200
            });
            stream.end(JSON.stringify(tasks));
        }
    })
}

//despues
const getOneTask = (ItemModel, stream) => {
    stream.respond({
        'content-type': 'text/html; charset=utf-8',
        ':status': 200
    });
    stream.end('<h1>Aqui ir[an las tareas</h1>');
}

module.exports = {getAllTasks, getOneTask}