import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  getUserByName,
  deleteUser
} from "../controllers/UserController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/busca", getUserByName)
router.get("/users/:id", getUser);

router.post("/users", createUser);

router.delete("/users/:id", deleteUser);

export default router;
