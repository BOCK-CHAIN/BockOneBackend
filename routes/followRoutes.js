import express from "express";
import {
  followChannel,
  unfollowChannel,
  checkFollowingStatus,
} from "../controllers/followController.js";

const router = express.Router();

router.post("/follow", followChannel);
router.post("/unfollow", unfollowChannel);
router.get("/status/:followerHexId/:followingHexId", checkFollowingStatus);

export default router;
