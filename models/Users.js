import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:{type: Boolean, default:false},
  role: { type: String, enum: ['principal', 'teacher', 'student'], required: true },
  
});
export default mongoose.model("Users",userSchema)