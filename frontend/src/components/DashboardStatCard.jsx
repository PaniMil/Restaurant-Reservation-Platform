function DashboardStatCard({ title, value }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 text-center">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="text-4xl font-bold text-orange-600 mt-2">

                {value}

            </h2>

        </div>

    );

}

export default DashboardStatCard;