import mongoose from 'mongoose';

const TimeTablenewSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  day:{ type: String, required:true},
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroomdb' },
});
export default mongoose.model("TimeTablenew",TimeTablenewSchema)