import Classroomdb from "../models/Classroomdb.js";
import Users from "../models/Users.js";
import TimeTablenew from "../models/timetable.js";


export const getStudentView = async (req, res) => {
  try {
    const studentId = req.params.student_id;
    console.log(studentId)
    const student = await Users.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: "false", msg: "Student not found!" });
    }

    const classrooms = await Classroomdb.find({});
  
    let reqclassroom = null;
    for(let classroom of classrooms){
      if(classroom.students.includes(studentId)){
        reqclassroom = classroom;
        break;
      }
    }
    
    if (!reqclassroom) {
      return res
        .status(404)
        .json({ success: "false", msg: "Classroom not found!" });
    }

    let otherstudents = reqclassroom.students.filter(id => id.toString() !== studentId).map(id => id.toString());

  
    const timetable = await TimeTablenew.find({ classroom: reqclassroom._id });

    res.json({ success: "true", otherstudents, timetable });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: "false",
        msg: "An error occurred while fetching data.",
      });
  }
};
