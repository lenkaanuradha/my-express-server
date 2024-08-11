import Classroomdb from "../models/Classroomdb.js";
import Users from "../models/Users.js";

export const createClassroom = async (req, res) => {
  try {
    const teacherName = req.body.teacher;
    console.log("Teacher Name:", teacherName);
   
  
    const teacher = await Users.find({name:teacherName});

    console.log(teacher[0])
    if (!teacher) {
      return res.status(404).json({
        success: "false",
        msg: "Teacher not found!",
      });
    }

    
    const teacherId = teacher[0]._id;
    
    let studentIds=[];
    const students=req.body.students;
  
     for(let ind in students){
        console.log(students[ind])
        let student = await Users.find({name:students[ind]});
        console.log(student)
   studentIds.push(student[0]._id)

     }
    
     console.log(studentIds)
    const newClassRoom = new Classroomdb({
      name: req.body.name,
      schedule: req.body.schedule,
      students: studentIds,
      teacher: teacherId,
    });

    
    await newClassRoom.save();

    res.status(200).json({
      success: "true",
      msg: "Classroom created successfully!",
      classRoomdetails: newClassRoom,
    });
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({
      success: "false",
      msg: "An error occurred while creating the classroom.",
    });
  }
};
