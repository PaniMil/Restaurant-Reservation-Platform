import {
    getAllUsers,
    getUserById,
    createAUser,
    updateUser,
    deleteUser,
    loginUser
} from "./UsersService.js";

export async function getUsers(req, res) {

    try {

        const users = await getAllUsers();

        res.json(users);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to get users"

        });

    }

}

export async function getUser(req, res) {

    try {

        const { id } = req.params;

        const user = await getUserById(id);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        res.json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to get user"

        });

    }

}

export async function createUser(req, res) {

    try {

        const user = await createAUser(req.body);

        res.status(201).json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to create user"

        });

    }

}

export async function editUser(req, res) {

    try {

        const { id } = req.params;

        const user = await updateUser(id, req.body);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        res.json(user);

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to update user"

        });

    }

}

export async function removeUser(req, res) {

    try {

        const { id } = req.params;

        const user = await deleteUser(id);

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        res.json({

            message: "User deleted successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Failed to delete user"

        });

    }

}

export async function login(req, res) {

    try {

        const {

            username,
            password

        } = req.body;

        const user = await loginUser(

            username,
            password

        );

        if (!user) {

            return res.status(401).json({

                message: "Invalid username or password"

            });

        }

        res.json(user);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Login failed"

        });

    }

}