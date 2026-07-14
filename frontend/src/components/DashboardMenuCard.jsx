import { Link } from "react-router-dom";

function DashboardMenuCard({ title, path }) {

    return (

        <Link

            to={path}

            className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition"

        >

            <h2 className="text-2xl font-semibold text-gray-800">

                {title}

            </h2>

        </Link>

    );

}

export default DashboardMenuCard;