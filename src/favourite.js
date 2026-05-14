'use strict';

const STORAGE_KEY = 'country_favourites';

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

    try {
        const favourites = getFavourites();
        const updated = favourites.includes(name)
            ? favourites.filter(fav => fav !== name)
            : [...favourites, name];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error(`Fout bij het opslaan van favorieten: ${error.message}`);
    }



}


export { getFavourites, isFavourite, toggleFavourite }