import express from "express";

import { getUsers, getUser, createUser, editUser, removeUser } from "./UsersController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", createUser);

router.put("/:id", editUser);

router.delete("/:id", removeUser);

export default router;