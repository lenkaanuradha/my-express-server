import  express  from "express";
const router = express.Router();
import { editUsers,deleteUsers } from "../controllers/PrincipalView.js";
router.put('/editUsers/:user_id',editUsers);
router.delete('/deleteUsers/:user_id',deleteUsers);
export default router;
