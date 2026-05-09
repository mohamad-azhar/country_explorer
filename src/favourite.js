'use strict';


//sleutelnaam in localStorage
const getFavourites = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error(`Fout bij het ophalen van favorieten: ${error.message}`);
        return [];
    }

}

// Checken of een land favoriet is
const isFavourite = (name) => {
    return getFavourites().includes(name);
}

// Favoriet toevoegen of verwijderen (toggle)
const toggleFavourite = (name) => {
    const favourites = getFavourites();
    if (favourites.includes(name)) {
        // Verwijderen uit favorieten
        const updated = favourites.filter(fav => fav !== name);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } else {
        // Toevoegen aan favorieten
        favourites.push(name);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    }
}


export {getFavourites, isFavourite, toggleFavourite}