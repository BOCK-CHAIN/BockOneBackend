import express from "express";
import { signup, getUser, login, loginWithHexId, syncUser } from "../controllers/usersController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/sync", syncUser);
router.post("/login", login);
router.post("/login-hex", loginWithHexId);
router.get("/:hexId", getUser);

export default router;
