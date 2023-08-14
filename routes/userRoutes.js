import express from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../controllers/userController.js";

// router Object
const router = express.Router();

// get all user || GET
router.get("/all-user", getAllUsers);

// CREATE USER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

export default router;
