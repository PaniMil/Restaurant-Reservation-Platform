function ManageRestaurantCard({

    restaurant,

    onEdit,

    onDelete

}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center">

            <div>

                <h2 className="text-2xl font-semibold">

                    {restaurant.name}

                </h2>

                <p className="text-gray-500 mt-2">

                    {restaurant.category}

                </p>

                <p className="text-gray-500">

                    {restaurant.city}

                </p>

            </div>

            <div className="flex gap-3">

                <button

                    onClick={onEdit}

                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"

                >

                    Edit

                </button>

                <button

                    onClick={onDelete}

                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default ManageRestaurantCard;