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
exports.User = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const envPath = path.resolve(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });
const DATABASE_URL = process.env.DATABASE_URL;
console.log("here" + DATABASE_URL);
try {
    const createConnection = async (DATABASE_URL) => {
        await mongoose_1.default.connect(DATABASE_URL);
    };
    createConnection(DATABASE_URL);
}
catch (error) {
    console.log(error);
}
//UserSchema
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    roll_no: Number
});
userSchema.index({ email: 1 }, { unique: true });
//adminSchema
const adminSchema = new mongoose_1.default.Schema({
    email: String,
    password: String
});
adminSchema.index({ email: 1 }, { unique: true });
exports.Admin = mongoose_1.default.model('Admin', adminSchema);
exports.User = mongoose_1.default.model('User', userSchema);
