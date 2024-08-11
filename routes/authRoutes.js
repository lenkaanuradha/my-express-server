import  express  from "express";
const router = express.Router();
import { login , createUser} from "../controllers/auth.js"


router.get('/',(req,res)=>{
   res.send("auth end point");
})
router.post('/login',login);
router.post('/register',createUser);
export default router;
