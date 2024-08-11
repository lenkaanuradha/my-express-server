import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schedule: [
    {
      day: {
        type: String, // e.g., 'Monday', 'Tuesday'
        required: true,
      },
      startTime: {
        type: String, // e.g., '12:00 PM'
        required: true,
      },
      endTime: {
        type: String, // e.g., '06:00 PM'
        required: true,
      },
    },
  ],
  students:{ type: [String]} ,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User',unique: true },
});

export default mongoose.model("classroom",classroomSchema)