import { Router }   from "express";
import express from "express";
import {verify,sign,decode} from "jsonwebtoken";
import {z} from "zod";
import {User} from "../schema"
import * as dotenv from "dotenv";
import { envPath } from "../index";
export const userRouter= Router();
dotenv.config({path:envPath});

userRouter.use(express.json())

const JWT_SECRET:string = process.env.JWT_SECRET as string;
userRouter.post('/signup',async (req,res)=>{
    
    const {email}= req.body;
    const singUpSchema = z.object({
        email:z.string().endsWith("@rajalakshmi.edu.in",{message:"Please register using the college mailID"}),
    })
    const result = singUpSchema.safeParse({
        email:email,
    })
    if(!result.success){
        res.status(403).json({
            msg:"error while signup"
        })
        return;
    }
    const userCreated = await User.findOne({
        email:email,        
    })
    const token = sign({userid:userCreated?._id},JWT_SECRET)
    if(userCreated){
        res.status(200).json({
            msg:"logged in",
            token:token
        })
    }
    else{
        res.status(403).json({
            msg:"User's email has not been added in the database"
        })
    }
})