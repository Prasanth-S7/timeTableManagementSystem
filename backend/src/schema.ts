import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as path from "path";
const envPath = path.resolve(__dirname, "..", "..", ".env");
dotenv.config({ path: envPath });
const DATABASE_URL = process.env.DATABASE_URL as string;
console.log("here" + DATABASE_URL);
try{
const createConnection = async (DATABASE_URL:string):Promise<void>=>{
  await mongoose.connect(DATABASE_URL);
}
createConnection(DATABASE_URL);
}
catch(error){
  console.log(error);
}
//UserSchema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true , unique:true},
  password: String,
  roll_no : Number
});
userSchema.index({ email: 1 }, { unique: true });

//adminSchema
const adminSchema = new mongoose.Schema({
  email:String,
  password:String
})
adminSchema.index({email:1},{unique:true})
export const Admin = mongoose.model('Admin',adminSchema);
export const User = mongoose.model('User', userSchema);
