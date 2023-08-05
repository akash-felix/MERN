import mongoose from "mongoose";


const storySchema = mongoose.Schema({
    caption:{type:String,require:true},
    username:{type:String,require:true},
    userId:{type:String,require:true},
    image:{type:String,require:true},
    tags:{type:String},
    likes:{type:[String],default:[]},
    postDate:{type:Date,default:new Date()},
});

export default mongoose.model("Story",storySchema);