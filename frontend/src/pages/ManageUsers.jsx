import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/users";
import ManageUserCard from "../components/ManageUserCard";


function ManageUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        try {

            const data = await getUsers();

            setUsers(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await deleteUser(id);

            await loadUsers();

            alert("User deleted.");

        }

        catch (err) {

            alert(err.message);

        }

    }

    const normalUsers = users.filter(
        (user) => user.role !== "admin"
    );


    return (

        <div className="min-h-screen bg-orange-50 py-10 px-8">


            <div className="max-w-6xl mx-auto">


                <h1 className="text-4xl font-bold text-orange-600 mb-8">

                    User Management

                </h1>



                <div className="space-y-5">

    {normalUsers.map((user) => (

        <ManageUserCard

            key={user.id}

            user={user}

            onDelete={() => handleDelete(user.id)}

        />

    ))}

</div>


            </div>


        </div>

    );

}


export default ManageUsers;