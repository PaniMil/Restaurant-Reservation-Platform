function HeroSection({

    search,

    setSearch

}) {

    return (

        // Dark overlay to improve text readability over the background image

        <div
            className="relative w-full h-[420px] rounded-3xl overflow-hidden bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/restaurants/hero.jpg')",
            }}
        >

            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black/45"></div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">

                <h1 className="text-6xl font-bold text-white">
                    Reserve Table
                </h1>

                <p className="mt-5 text-2xl font-semibold text-white">
                    Find Your Perfect Restaurant
                </p>

                <p className="mt-3 text-white/90">
                    Reserve your favorite table in seconds.
                </p>

                <div className="mt-10 w-full max-w-2xl">

                    <input
                        type="text"
                        placeholder="Search restaurant..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            bg-white
                            px-5
                            py-4
                            text-gray-800
                            shadow-xl
                            outline-none
                        "
                    />

                </div>

            </div>

        </div>

    );

}

export default HeroSection;