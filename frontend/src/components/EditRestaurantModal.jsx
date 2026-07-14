import { useState } from "react";
import { updateRestaurant } from "../services/restaurants";


function EditRestaurantModal({ restaurant, onClose, onUpdate }) {


    const [name, setName] = useState(
        restaurant.name
    );

    const [category, setCategory] = useState(
        restaurant.category
    );

    const [city, setCity] = useState(
        restaurant.city
    );

    const [tables, setTables] = useState(
        restaurant.tables
    );



    async function handleSave() {

        const updatedRestaurant = {

            ...restaurant,

            name,

            category,

            city,

            tables: Number(tables)

        };

        try {

            await updateRestaurant(

                restaurant.id,

                updatedRestaurant

            );

            await onUpdate();

            onClose();

        }

        catch (err) {

            alert(err.message);

        }

    }



    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">


            <div className="bg-white rounded-xl p-8 w-full max-w-md">


                <h2 className="text-2xl font-bold text-orange-600">

                    Edit Restaurant

                </h2>



                <input

                    value={name}

                    onChange={(e) => setName(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-5"

                />


                <input

                    value={category}

                    onChange={(e) => setCategory(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-4"

                />


                <input

                    value={city}

                    onChange={(e) => setCity(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-4"

                />


                <input

                    type="number"

                    value={tables}

                    onChange={(e) => setTables(e.target.value)}

                    className="w-full border rounded-lg px-4 py-3 mt-4"

                />



                <div className="flex gap-4 mt-6">


                    <button

                        onClick={handleSave}

                        className="flex-1 bg-orange-500 text-white py-3 rounded-lg"

                    >

                        Save

                    </button>



                    <button

                        onClick={onClose}

                        className="flex-1 border py-3 rounded-lg"

                    >

                        Cancel

                    </button>


                </div>


            </div>


        </div>

    );

}


export default EditRestaurantModal;