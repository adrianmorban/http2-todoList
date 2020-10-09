const {getVersionModel} = require('../models/version');

const getLastVersion = async () => {
    let versionModel = await getVersionModel();
    let Version;
    await versionModel.findOne({}, (err, version) => {
        if(err) console.log(err);
        else Version = version;
    })
    return Version;
}

const updateLastVersion = async (lastVersion, lastId) => {
    let updateId = lastId + 1;
    let updateVersion = lastVersion + 1;
    let versionModel = await getVersionModel();
    await versionModel.updateOne({}, {lastId: updateId, lastVersion: updateVersion})
}

module.exports = {getLastVersion, updateLastVersion};