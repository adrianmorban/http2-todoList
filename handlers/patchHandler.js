const {errorResponse, objectResponse} = require('../utility/responses');
const {updateLastVersion, getLastVersion} = require('../utility/versions');

const patchHandler = (taskModel, data, res, id) => {
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

module.exports = {patchHandler}