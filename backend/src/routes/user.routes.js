import { Router } from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { allUsers } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()


router.route("/")
.post(registerUser)
.get(verifyJWT,allUsers)
router.route("/login").post(loginUser)

export default router;