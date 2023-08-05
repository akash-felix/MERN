import mongoose from "mongoose";
import Story from "../models/storyContent.js";

const getStories = async (req,res)=>{
    
    try {
        const stroy = await Story.find();
    
        res.status(200).json(stroy);
    } catch (error) {
        res.status(404).json({message:error.message});    
    }
}
const createStory = async(req,res)=>{console.log(req.body);
    const body = req.body;
    const newStory = new Story({
        ...body,
        userId: req.userId,
        postDate: new Date().toISOString()
    })
    try {
        await newStory.save();
        res.status(200).json(newStory);
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

const updateStory = async(req,res)=>{
    const {id:_id}= req.params;
    const story = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send("THis doen't belongs to any story");
    }
    const updateStory = await Story.findByIdAndUpdate(_id,story,{new:true});
    res.json(updateStory);
}

 const deleteStory =  async(req,res)=>{
    const {id:_id}=req.params;
    try {
         await Story.findByIdAndDelete(_id);
        res.json({message:"deleted"});
    } catch (error) {
        res.status(400).send("error occured");
    }
}
const likeStory = async (req,res)=>{
    const {id:_id} = req.params;
    if(!req.userId) return res.json({message:"Unauthenticated User"});
    try {
        const story = await Story.findById(_id);
        const index = story.findIndex(id=>id ===String(req.userId));
        if(index === -1){
            story.likes.push(req.userId);
        }
        else{
            story.likes = story.likes.filter(id=>id !==String(req.userId));
        }
        const updateStory = await Story.findByIdAndUpdate(_id,{likes:story.likes + 1},{new:true});
        res.json(updateStory);
    } catch (error) {
        res.status(500).send("error")
    }
}
export {getStories,createStory,updateStory,deleteStory,likeStory};