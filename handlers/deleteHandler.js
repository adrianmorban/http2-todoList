const deleteHandler = (taskModel, res, id) => {
    taskModel.deleteOne({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.writeHead(400,undefined,{'content-type': 'application/json'})
            res.end({
                code: 400,
                msg: 'Bad request'
            });
        } else {
            res.writeHead(200,undefined,{'content-type': 'application/json'});
            res.end(JSON.stringify({msg: 'OK'}));
        }
    })
}

module.exports = {deleteHandler}