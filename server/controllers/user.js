import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

const login = async (req,res) => {
    const{email,password} = req.body;
    try {
        const oldUser = await User.findOne({email});
        if(!oldUser){
            return res.status(400).json({msg:"User does not exist"});
        }
        const isPasswordValid = await bcrypt.compare(password,oldUser.password);
        if(!isPasswordValid){
            return res.status(400).json({msg:"Invalid Password"});
        }
        const token = jwt.sign({email:oldUser.email,id:oldUser._id},"1234",{expiresIn:"1h"});
        res.status(200).json({result:oldUser,token});
    } catch (error) {
        res.status(500).json({msg:"Server error"});
    }
}

const signup = async (req,res) =>{console.log("callser");
    const {username,email,password,confirmPassword} = req.body;
    const oldUser = await User.findOne({email:email});
    try {
        if(oldUser){
            return res.status(400).json({msg:"User already Exists"});
         }
         if(password!==confirmPassword){
             return res.status(400).json({msg:"passwords does not match"});
     
         }
         const encryptPassword = await bcrypt.hash(password,12);
         const result = await User.create({username,email,password:encryptPassword});
         const token = jwt.sign({email:result.email,id:result._id},"1234",{expiresIn:"1h"});
         res.status(201).json({result,token}); 
    } catch (error) {
        res.status(500).json({msg:"Something went wrong"});
    }
     
}




export {login,signup};