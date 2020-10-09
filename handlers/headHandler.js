const {objectResponse} = require('../utility/responses');
const {getLastVersion} = require('../utility/versions');

const headHandler = (taskModel, data, res, id) => {
    getLastVersion().then((version) => {
        
    })
}

module.exports = {headHandler}