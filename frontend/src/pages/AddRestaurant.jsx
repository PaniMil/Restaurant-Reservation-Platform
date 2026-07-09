import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRestaurant } from "../services/restaurants";


function AddRestaurant() {


    const navigate = useNavigate();


    const [name, setName] = useState("");

    const [category, setCategory] = useState("");

    const [city, setCity] = useState("");

    const [tables, setTables] = useState("");

    const [description, setDescription] = useState("");



    function handleSubmit() {


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


            id: Date.now(),

            name,

            category,

            city,

            tables: Number(tables),

            description,


            // rating: 0,
            image : null,

            openingTime: "10:00",

            closingTime: "22:00",

            reservationInterval: 30,

            minimumReservationMinutes: 30,

            maximumReservationMinutes: 120


        };



        addRestaurant(newRestaurant);



        alert("Restaurant added!");



        // navigate("/admin/restaurants", {
        //     state: {
        //         refresh: true
        //     }
        // });
        navigate("/admin/restaurants");

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



                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3"
                    />



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