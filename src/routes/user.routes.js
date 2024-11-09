import { Router } from "express";
import {
  deleteUser,
  getUserDeatils,
  login,
  register,
  updateUsername,
  updateUserDeatils,
  verification,
  getUsername,
  deleteUserPermanent,
} from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// routes
router.route("/register").post(register);
router.route("/login").get(login);
router.route("/updateUsername").get(auth, updateUsername);
router.route("/getUsername").get(auth, getUsername);

router
  .route("/updateUserDeatils")
  .patch(auth, upload.single("profilePicture"), updateUserDeatils);
router.route("/verify").patch(verification);
router.route("/getUser").patch(getUserDeatils);
router.route("/delete").delete(deleteUser);
router.route("/delete").delete(deleteUserPermanent);

export default router;
