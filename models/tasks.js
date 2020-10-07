const { Schema } = require('mongoose');

class Task {
    constructor(ID, description, status, dueDate){
        this._id = ID;
        this.description = description;
        this.status = statis;
        this.dueDate = dueDate;
    }
}

const TaskSchema = new Schema({
    _id: {
        type: 'Number',
    },
    description:{
        type: 'String',
        required: [true, 'Description is a required field']
    },
    status:{
        type: 'String',
        default: 'Pending',
        enum: ['Pending', 'Complete'],
    },
    dueDate: {
        type: 'Date',
        required: [true, 'Date is a required field']
    },
})

module.exports = {Task, TaskSchema};