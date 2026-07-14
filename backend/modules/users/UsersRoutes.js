import express from "express";

import {
    getUsers,
    getUser,
    createUser,
    editUser,
    removeUser,
    login,
    editPassword
} from "./UsersController.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/login", login);

router.get("/:id", getUser);

router.post("/", createUser);

router.put("/:id", editUser);

router.put("/:id/password", editPassword);

router.delete("/:id", removeUser);

export default router;