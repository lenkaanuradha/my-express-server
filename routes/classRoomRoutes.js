import  express  from "express";
const router = express.Router();
import { createClassroom } from "../controllers/classRoom.js";
import { getPrincipalView } from "../controllers/PrincipalView.js";
import { getTeachersView } from "../controllers/TeachersView.js";
import { getStudentView } from "../controllers/StudentView.js";
router.post('/createClassroom',createClassroom);
router.get('/getPrincipalView',getPrincipalView);
router.get('/getTeachersView/:teacher_id',getTeachersView);
router.get('/getStudentView/:student_id',getStudentView);
export default router;
