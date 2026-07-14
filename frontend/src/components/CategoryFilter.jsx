function CategoryFilter({

    categories,

    category,

    setCategory

}) {

    return (

        <div className="mt-10 flex flex-wrap justify-center gap-4">

            {categories.map((cat) => (

                <button

                    key={cat}

                    onClick={() => setCategory(cat)}

                    className={`px-5 py-2 rounded-full border transition duration-300
                    ${category === cat
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-orange-600 border-orange-300 hover:bg-orange-500 hover:text-white"
                        }`}

                >

                    {cat}

                </button>

            ))}

        </div>

    );

}

export default CategoryFilter;