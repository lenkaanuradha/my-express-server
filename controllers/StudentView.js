import Classroomdb from "../models/Classroomdb.js";
import Users from "../models/Users.js";
import TimeTablenew from "../models/timetable.js";

export const getStudentView = async (req, res) => {
  try {
    const studentId = req.params.student_id;
    console.log(studentId);

    const student = await Users.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ success: "false", msg: "Student not found!" });
    }

    const classrooms = await Classroomdb.find({});

    let reqclassroom = null;
    for (let classroom of classrooms) {
      if (classroom.students.includes(studentId)) {
        reqclassroom = classroom;
        console.log(reqclassroom);
        break;
      }
    }

    if (!reqclassroom) {
      return res
        .status(404)
        .json({ success: "false", msg: "Classroom not found!" });
    }

    let otherstudents = reqclassroom.students
      .filter(id => id.toString() !== studentId)
      .map(id => id.toString());
    console.log(otherstudents);

    const timetable = await TimeTablenew.find({ classroom: reqclassroom._id });

    // Fetch user details for all other students
    const otherstudentsObjs = await Promise.all(
      otherstudents.map(async (id) => await Users.findById(id))
    );

    console.log(otherstudentsObjs);

    res.json({ success: "true", otherstudentsObjs, timetable });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: "false",
      msg: "An error occurred while fetching data.",
    });
  }
};
