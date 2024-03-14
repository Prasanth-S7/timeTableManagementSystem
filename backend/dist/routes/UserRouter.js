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
exports.userRouter = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = require("zod");
const schema_1 = require("../schema");
const dotenv = __importStar(require("dotenv"));
const index_1 = require("../index");
exports.userRouter = (0, express_1.Router)();
dotenv.config({ path: index_1.envPath });
exports.userRouter.use(express_2.default.json());
const JWT_SECRET = process.env.JWT_SECRET;
exports.userRouter.post('/signup', async (req, res) => {
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
    const userCreated = await schema_1.User.findOne({
        email: email,
    });
    const token = (0, jsonwebtoken_1.sign)({ userid: userCreated?._id }, JWT_SECRET);
    if (userCreated) {
        res.status(200).json({
            msg: "logged in",
            token: token
        });
    }
    else {
        res.status(403).json({
            msg: "User's email has not been added in the database"
        });
    }
});
