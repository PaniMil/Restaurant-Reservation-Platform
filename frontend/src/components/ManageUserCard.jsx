function ManageUserCard({

    user,

    onDelete

}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-semibold">

                    {user.full_name}

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

                onClick={onDelete}

                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

            >

                Delete

            </button>

        </div>

    );

}

export default ManageUserCard;