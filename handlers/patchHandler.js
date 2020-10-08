const patchHandler = (TaskModel, data, res, id) => { 
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
            res.end(JSON.stringify({msg: 'OK'}));
        }; 
    })
}

module.exports = {patchHandler}