import  express  from "express";
const router = express.Router();
import { createtimeTable,editTimetable,getTimetables } from "../controllers/timetable.js";

router.post('/createTimetable',createtimeTable);
router.get('/getTimetables',getTimetables);
router.put('/edittimetable/:timetable_id',editTimetable);
export default router;
