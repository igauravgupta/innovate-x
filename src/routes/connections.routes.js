import { Router } from "express";
import {
  addFollower,
  addFollowing,
  removeFollower,
  removeFollowing,
  getFollowers,
  getFollowing,
} from "../controllers/connections.controller.js";
const router = router();

// routes

router.route("/addFollower").get(auth, addFollower);
router.route("/removeFollower").get(auth, removeFollower);

router.route("/addFollowing").get(auth, addFollowing);
router.route("/removeFollowing").get(auth, removeFollowing);

router.route("/getFollowing").get(getFollowing);
router.route("/getFollowers").get(getFollowers);

export default router;
