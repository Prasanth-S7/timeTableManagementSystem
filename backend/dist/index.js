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
exports.envPath = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
const UserRouter_1 = require("./routes/UserRouter");
const AdminRouter_1 = __importDefault(require("./routes/AdminRouter"));
exports.envPath = path.resolve(__dirname, "..", "..", ".env");
dotenv.config({ path: exports.envPath });
const DATABASE_URL = process.env.DATABASE_URL;
const port = process.env.PORT;
console.log(DATABASE_URL);
console.log(port);
const router = express_1.default.Router();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(router);
app.use(express_1.default.json());
router.use('/api/v1/user', UserRouter_1.userRouter);
router.use('/api/v1/admin', AdminRouter_1.default);
app.get('/', (req, res) => {
    res.json({
        msg: "route works"
    });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log("server started successfully");
});
