const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    lastVersion: {
        type: 'Number',
    },
    lastId: {
        type: 'Number',
    }
})

const getVersionModel = async() => {
    let versionModel = await mongoose.model("Version", versionSchema);
    return versionModel;
}

const createFirstVersion = (versionModel) => {
    let versionCreate = new versionModel({lastVersion: 1, lastId: 1})
    versionCreate.save();
}

module.exports = {getVersionModel, createFirstVersion};