import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRestaurant } from "../services/restaurants";
import categories from "../data/categories";


function AddRestaurant() {


    const navigate = useNavigate();


    const [name, setName] = useState("");

    const [category, setCategory] = useState("");

    const [city, setCity] = useState("");

    const [tables, setTables] = useState("");

    const [description, setDescription] = useState("");



    async function handleSubmit() {


        if (
            !name ||
            !category ||
            !city ||
            !tables
        ) {

            alert("Please fill required fields.");

            return;

        }



        const newRestaurant = {

            name,

            category,

            city,

            tables: Number(tables),

            description,

            image_url: null,

            opening_time: "10:00",

            closing_time: "22:00",

            reservation_interval: 30,

            minimum_reservation_minutes: 30,

            maximum_reservation_minutes: 120


        };



        try {

            await addRestaurant(newRestaurant);

            alert("Restaurant added!");

            navigate("/admin/restaurants");

        }

        catch (err) {

            alert(err.message);

        }

    }



    return (

        <div className="min-h-screen bg-orange-50 py-10 px-8">


            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">


                <h1 className="text-4xl font-bold text-orange-600">

                    Add Restaurant

                </h1>



                <div className="space-y-5 mt-8">



                    <input
                        type="text"
                        placeholder="Restaurant Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                    />



                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 bg-white"
                    >

                        <option value="">

                            Select Category

                        </option>

                        {categories.map((cat) => (

                            <option
                                key={cat}
                                value={cat}
                            >

                                {cat}

                            </option>

                        ))}

                    </select>



                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                    />



                    <input
                        type="number"
                        placeholder="Number of Tables"
                        value={tables}
                        onChange={(e) => setTables(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                    />



                    <textarea
                        rows="4"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                    />



                    <button

                        onClick={handleSubmit}

                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"

                    >

                        Add Restaurant

                    </button>



                </div>


            </div>


        </div>

    );


}


export default AddRestaurant;