const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    // this is to know which user has clicked like
    user:{
        type: mongoose.Schema.ObjectId
    },
    // this defines the objectid of liked object
    likeable: {
        type : mongoose.Schema.ObjectId,
        require:true,
        refPath : 'onModel'
    },
    // this field is used for defining the type of liked object as it is the dynamic path
    onModel: {
        type : String,
        require:true,
        enum : ['Post','Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);

module.exports = Like;