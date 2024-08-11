import Classroomdb from "../models/Classroomdb.js";
import Users from "../models/Users.js";

export const getTeachersView = async (req, res) => {
  try {
    console.log(req.params.teacher_id);

   
    const classroom = await Classroomdb.findOne({ teacher: req.params.teacher_id });
    
    if (!classroom) {
      return res.status(404).json({ success: "false", msg: "Classroom not found" });
    }

  
    
    const studentIds = classroom.students;
    const studentObj = [];

    // Fetch student details
    for (let ind in studentIds) {
    
      const student = await Users.find({_id:studentIds[ind]}); 
      
      studentObj.push(student)
    }

    // console.log(studentObj, "studentObj");

    res.json({ success: "true", studentObj });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: "false",
      msg: "An error occurred while fetching students",
    });
  }
};
