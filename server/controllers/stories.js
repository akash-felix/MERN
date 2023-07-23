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
        ...body
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

export {getStories,createStory,updateStory};