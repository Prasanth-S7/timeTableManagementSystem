"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
const schema_1 = require("../schema");
const dotenv = __importStar(require("dotenv"));
const index_1 = require("../index");
dotenv.config({ path: index_1.envPath });
const JWT_SECRET = process.env.JWT_SECRET;
const adminRouter = (0, express_1.Router)();
adminRouter.use(express_2.default.json());
adminRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const isAdmin = await schema_1.Admin.findOne({
        email: email,
        password: password,
    });
    if (isAdmin) {
        const token = (0, jsonwebtoken_1.sign)({ adminId: isAdmin._id }, JWT_SECRET);
        res.status(200).json({
            msg: "logged in",
            token: token
        });
    }
    else {
        res.status(403).json({
            msg: "Unauthorized bad email or password"
        });
    }
});
adminRouter.post('/createUser', async (req, res) => {
    console.log(req.body);
    try {
        const { email } = req.body;
        const singUpSchema = zod_1.z.object({
            email: zod_1.z.string().endsWith("@rajalakshmi.edu.in", { message: "Please register using the college mailID" }),
        });
        const result = singUpSchema.safeParse({
            email: email,
        });
        if (!result.success) {
            res.status(403).json({
                msg: "error while signup"
            });
            return;
        }
        try {
            const createUser = await schema_1.User.create({
                email: email
            });
            res.status(200).json({
                msg: "User created successfully"
            });
        }
        catch (error) {
            if (error.code === 11000) {
                res.status(409).json({
                    msg: "Duplicate User"
                });
            }
            console.log(error);
            res.status;
        }
    }
    catch (error) {
        console.log(error);
    }
});
adminRouter.post('/deleteUser', async (req, res) => {
    try {
        const { email } = req.body;
        const isDeleted = await schema_1.User.deleteOne({
            email: email
        });
        console.log(isDeleted);
        res.json({
            msg: "User deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});
adminRouter.get('/getUsers', async (req, res) => {
    try {
        const registeredUsers = await schema_1.User.find();
        res.status(200).json({
            users: registeredUsers
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = adminRouter;
