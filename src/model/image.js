const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    path: { 
        type: String, 
        required: true 
    },
    folderId: { 
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

module.exports = mongoose.model('Image', imageSchema);
