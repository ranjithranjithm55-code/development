import express from "express";

import {
  adminLogin,
  getAdmin,
  adminLogout
} from "../controllers/adminController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

router.get(
  "/me",
  authMiddleware,
  adminMiddleware,
  getAdmin
);

router.post(
  "/logout",
  authMiddleware,
  adminMiddleware,
  adminLogout
);

export default router;