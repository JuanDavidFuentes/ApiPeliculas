import mongoose from "mongoose";

const ActorSchema = new mongoose.Schema({
    nombre:{type:String,maxlength:20,required:true},
    foto:{type:String,required:true},
    observaciones:{type:String},
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Actores",ActorSchema)