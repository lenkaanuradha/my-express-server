import Users from "../models/Users.js";
export const getPrincipalView = async (req, res) => {
  try {
    const teacherObjects = await Users.find({role:"teacher"});
    const studentObjects = await Users.find({role:"student"});
 
    res.json({ success: "true" ,teacherObjects:teacherObjects,studentObjects:studentObjects});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: "false",
        msg: "An error occurred while fetching all classes",
      });
  }
};
export const editUsers = async (req, res) => {
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.user_id, {$set : req.body},{new:true});
        console.log(updatedUser)
    
        res.status(200).json({ success: "true" , updatedUser:updatedUser});
    } catch (error) {
      console.log(error)
    
      res.status(500).json({ success: "false", msg:"error occured while updating user!" });
    
    }
  };
  export const deleteUsers = async (req, res, next) => {
    try {
       await Users.findByIdAndDelete(req.params.user_id);
     
      console.log("id",req.params.user_id,"id")
     
      res.status(200).json({ success: "true", msg:"User got deleted successfully" });
    } catch (error) {
      console.log(error)
      res.json({ success: "false" });
      
    }
  };