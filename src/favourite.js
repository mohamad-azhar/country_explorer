'use strict';


//sleutelnaam in localStorage
const getFavourites = () => {
    try {
        const STORAGE_KEY = 'country_favourites';
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
        const updated = favourites.includes(name)
            ? favourites.filter(fav => fav !== name)
            : [...favourites, name];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
}


export { getFavourites, isFavourite, toggleFavourite }