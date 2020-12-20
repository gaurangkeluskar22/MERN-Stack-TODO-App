const mongoose = require('mongoose')

const TodoAppSchema ={
    todoName:{
        type:String,
        required:true,
    },

    todoDescription:{
        type:String,
        required:true,
    }
     
}

const TODO = mongoose.model('TODO',TodoAppSchema);
module.exports = TODO;



