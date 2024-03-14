import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as path from "path";
import { userRouter } from "./routes/UserRouter";
import adminRouter from "./routes/AdminRouter";
export const envPath = path.resolve(__dirname, "..",".." ,".env");
dotenv.config({path:envPath});
const DATABASE_URL:string= process.env.DATABASE_URL as string ;
const port = process.env.PORT;
console.log(DATABASE_URL);
console.log(port);

const router = express.Router();
const app=express();
app.use(cors())
app.use(router)
app.use(express.json())
router.use('/api/v1/user',userRouter);
router.use('/api/v1/admin',adminRouter);
app.get('/',(req,res)=>{
    res.json({
        msg:"route works"
    })
})
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server started successfully")
})