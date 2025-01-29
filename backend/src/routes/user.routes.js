import {Router} from 'express';
import { registerUser,loginUser,logoutUser,refreshAccessToken } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
//payment


const router=Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//middleware is used
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
//upload file

//seller


export default router;