import Story from "../models/storyContent.js";

const getStories = async (req,res)=>{
    
    try {
        const stroy = await Story.find();
    
        res.status(200).json(stroy);
    } catch (error) {
        res.status(404).json({message:error.message});    
    }
}
const createStory = async(req,res)=>{
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
export {getStories,createStory};