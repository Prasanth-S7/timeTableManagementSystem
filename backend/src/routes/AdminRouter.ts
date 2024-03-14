import { Router } from "express";
import express from "express";
import {  z } from "zod";
import {sign} from "jsonwebtoken";
import { User, Admin } from "../schema"
import * as dotenv from "dotenv";
import { envPath } from "../index";
dotenv.config({path:envPath});
const JWT_SECRET = process.env.JWT_SECRET as string;
const adminRouter = Router();
adminRouter.use(express.json())

adminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const isAdmin = await Admin.findOne({
        email: email,
        password: password,
    })
    if (isAdmin) {
        const token = sign({adminId:isAdmin._id},JWT_SECRET);
        res.status(200).json({
            msg: "logged in",
            token:token
        })
    }
    else {
        res.status(403).json({
            msg: "Unauthorized, bad email or password"
        })
    }

})
adminRouter.post('/createUser', async (req, res) => {
    console.log(req.body);
    try {
        const { email } = req.body;
        const singUpSchema = z.object({
            email: z.string().endsWith("@rajalakshmi.edu.in", { message: "Please register using the college mailID" }),
        })
        const result = singUpSchema.safeParse({
            email: email,
        })
        if (!result.success) {
            res.status(403).json({
                msg: "error while signup"
            })
            return;
        }
        try {
            const createUser = await User.create({
                email: email
            })
            res.status(200).json({
                msg: "User created successfully"
            })
        }
        catch (error: any) {
            if (error.code === 11000) {
                res.status(409).json({
                    msg: "Duplicate User"
                })
            }
            console.log(error);
            res.status
        }
    }
    catch (error) {
        console.log(error)
    }
})

adminRouter.post('/deleteUser', async (req, res) => {
    try {
        const { email } = req.body;
        const isDeleted = await User.deleteOne({
            email: email
        })
        console.log(isDeleted);
        res.json({
            msg: "User deleted successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})
adminRouter.get('/getUsers', async (req, res) => {
    try {
        const registeredUsers = await User.find();
        res.status(200).json({
            users: registeredUsers
        })
    }
    catch (error) {
        console.log(error)
    }
})
export default adminRouter;