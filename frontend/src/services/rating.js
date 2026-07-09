const STORAGE_KEY = "ratings";


export function getRatings(){

    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];

}



export function addRating(rating){

    const ratings = getRatings();

    const updatedRatings = [
        ...ratings,
        rating
    ];

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedRatings)
    );

}