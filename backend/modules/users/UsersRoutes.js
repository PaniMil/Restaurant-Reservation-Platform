import express from "express";

import {
    getUsers,
    getUser,
    createUser,
    editUser,
    removeUser,
    login
} from "./UsersController.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/login", login);

router.get("/:id", getUser);

router.post("/", createUser);

router.put("/:id", editUser);

router.delete("/:id", removeUser);

export default router;