import { useState } from "react";
import { deleteUser, getUsers } from "../services/users";


function ManageUsers() {

    const [users, setUsers] = useState(getUsers());


    function handleDelete(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );


        if (!confirmDelete) {
            return;
        }


        deleteUser(id);


        setUsers(getUsers());

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


                        <div
                            key={user.id}
                            className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
                        >


                            <div>

                                <h2 className="text-2xl font-semibold">

                                    {user.fullName}

                                </h2>


                                <p className="text-gray-500 mt-2">

                                    Username: {user.username}

                                </p>


                                <p className="text-gray-500">

                                    Email: {user.email}

                                </p>


                                <p className="text-gray-500">

                                    Role: {user.role}

                                </p>


                            </div>



                            <button

                                onClick={() => handleDelete(user.id)}

                                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                            >

                                Delete

                            </button>


                        </div>


                    ))}


                </div>


            </div>


        </div>

    );

}


export default ManageUsers;