const {headResponse} = require('../utility/responses');
const {getLastVersion} = require('../utility/versions');

const headHandler = (res, req) => {
    getLastVersion().then((version) => {
        headResponse(res, version.lastVersion, req.headers['if-none-match']);
    })
}

module.exports = {headHandler}