import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const createUser = async (req, res) => {
 
 
  try {
    if (req.body.role === "principal") {
      let princi = await Users.findOne({ role: req.body.role });
    
      if (!princi) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new Users({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isAdmin:true,
          role: req.body.role,
        });
        await newUser.save();
        res
        .status(200)
        .json({ success: "true", msg: "user created successfully!",userdetails:newUser });
      }
      else{
        res
        .status(200)
        .json({ success: "false", msg: "Principal already exists!" });
      }
    }
    else{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hash,
     
      role: req.body.role,
    });
    await newUser.save();
    res
    .status(200)
    .json({ success: "true", msg: "user created successfully!",userdetails:newUser });
}
   
  
  } catch (error) {
    console.log(error)
    res.json({ success: "false" });
  }
};
export const login = async (req, res,next) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
     console.log(user,"kk")
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    console.log(match,req.body.password,user.password)
    if (!match) {
      return res.status(400).json({ msg: "Password does not match" });
    }
 
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
    console.log(token,"token")
    const { password, role,isAdmin, name, ...otherDetails } = user._doc;

    res
      .status(200)
      .json({
        details: { ...otherDetails },
        success: "true",
        isAdmin: isAdmin,
        token: token,
        username: name,
        role:role
      });
  } catch (error) {
    console.log(error)
    next(error);
  }
};
