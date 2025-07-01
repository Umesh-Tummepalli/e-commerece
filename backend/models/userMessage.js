import mongoose from "mongoose";

const userMessageSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});

const userMessageModel=mongoose.model('userMessage',userMessageSchema);
export default userMessageModel;