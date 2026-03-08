import express from "express";
import {
  deleteAccount,
  login,
  logout,
  register,
} from "../controllers/aut.controllers.js";
import verifytoken from "../middlewares/verifytoken.js";
import { me } from "../controllers/aut.controllers.js";

const router = express.Router();

// route / yolları belirle
router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", verifytoken, me);

router.delete("/deleteaccount", verifytoken, deleteAccount);

export default router;
