import { useState } from "react";
import { addRating } from "../services/rating";

function RatingModal({ reservation, onClose }) {

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");


    function handleSubmit() {

        if (rating === 0) {

            alert("Please select a rating.");

            return;

        }


        const newRating = {

            id: Date.now(),

            restaurantId: reservation.restaurant_id,

            reservationId: reservation.id,

            rating: rating,

            comment: comment

        };


        addRating(newRating);

        alert("Rating submitted!");

        onClose();

    }


    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">


                <h2 className="text-2xl font-bold text-orange-600">

                    Rate Restaurant

                </h2>


                <p className="text-gray-500 mt-2">

                    How was your experience?

                </p>


                <div className="flex gap-3 mt-6 text-4xl">

                    {[1, 2, 3, 4, 5].map((star) => (

                        <button

                            key={star}

                            onClick={() => setRating(star)}

                        >

                            {star <= rating ? "⭐" : "☆"}

                        </button>

                    ))}

                </div>


                <textarea

                    value={comment}

                    onChange={(e) => setComment(e.target.value)}

                    rows="4"

                    placeholder="Write your comment..."

                    className="w-full border rounded-lg px-4 py-3 mt-6"

                />


                <div className="flex gap-4 mt-6">


                    <button

                        onClick={handleSubmit}

                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg"

                    >

                        Submit

                    </button>


                    <button

                        onClick={onClose}

                        className="flex-1 border border-gray-300 py-3 rounded-lg"

                    >

                        Cancel

                    </button>


                </div>


            </div>

        </div>

    );

}


export default RatingModal;