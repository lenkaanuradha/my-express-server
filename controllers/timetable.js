import TimeTablenew from "../models/timetable.js";
import Classroomdb from "../models/Classroomdb.js";

export const createtimeTable = async (req, res) => {
  try {
    const { classroom, subject, startTime, endTime, day } = req.body;
   console.log(classroom,subject,startTime, endTime,day)
    const classRoom = await Classroomdb.findOne({name:classroom});
    if (!classRoom) {
      return res.status(404).json({ success: "false", msg: "Classroom not found!" });
    }

    const scheduleSlot = classRoom.schedule.find(slot => slot.day === day);
    if (!scheduleSlot) {
      return res.status(404).json({ success: "false", msg: "Schedule for the specified day not found!" });
    }

    const class_start = scheduleSlot.startTime;
    const class_end = scheduleSlot.endTime;
    const timeToMinutes = (time) => {
        const [timePart, period] = time.split(/(AM|PM)$/); 
        let [hour, minute] = timePart.split(':').map(Number);
      
        
        if (period === 'PM' && hour !== 12) {
          hour += 12;
        } else if (period === 'AM' && hour === 12) {
          hour = 0; 
        }
      
        return hour * 60 + minute;
      };
      
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    const classStartMinutes = timeToMinutes(class_start);
    const classEndMinutes = timeToMinutes(class_end);

    console.log(startMinutes, endMinutes, classStartMinutes, classEndMinutes);

    const isValidTime = (startMinutes, endMinutes, classStartMinutes, classEndMinutes) => {
      return (
        startMinutes >= classStartMinutes &&
        endMinutes <= classEndMinutes &&
        startMinutes < endMinutes
      );
    };
 const classRoomId=classRoom._id;
    if (isValidTime(startMinutes, endMinutes, classStartMinutes, classEndMinutes)) {
      const newTimeTable = new TimeTablenew({
        subject,
        startTime,
        endTime,
        day,
        classRoomId
      });
      await newTimeTable.save();
      res.status(200).json({
        success: "true",
        msg: "Timetable created successfully!",
        timetableDetails: newTimeTable
      });
    } else {
      res.status(400).json({ success: "false", msg: "Invalid Time! Ensure the period is within the classroom's schedule." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: "false", msg: "An error occurred while creating the timetable." });
  }
};
export const getTimetables = async (req, res, next) => {
 
  try {
   
  const allTimetables = await TimeTablenew.find({})
  
 res.status(200).json({success:"true", allTimetables:allTimetables});;
  } catch (error) {
   
    
    res.status(500).json({success:"false", error:error});
  }
};
export const editTimetable = async (req, res) => {
  try {
      const updatedUser = await TimeTablenew.findByIdAndUpdate(req.params.timetable_id, {$set : req.body},{new:true});
      console.log(updatedUser)
  
      res.status(200).json({ success: "true" , updatedUser:updatedUser});
  } catch (error) {
    console.log(error)
  
    res.status(500).json({ success: "false", msg:"error occured while updating user!" });
  
  }
};