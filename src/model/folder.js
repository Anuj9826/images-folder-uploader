const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    parent: { 
        type: Schema.Types.ObjectId, 
        ref: 'Folder', 
        default: null 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
});

module.exports = mongoose.model('Folder', folderSchema);
