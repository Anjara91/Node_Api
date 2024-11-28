const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
    name: {type:String, require:true},
    email: {type:String, require:true, unique:true},
    birth: {type:Date},
    password: {type: String, require: true},
    image: {type:String, default: "" },
    role: {type:String, enum:["student", "teacher"]},
    },
    {
    collection:"users",
    timestamps:true //createdAt, updatedAt se crearan automáticamente 
    }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;