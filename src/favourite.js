'use strict';


//sleutelnaam in localStorage
const getFavourites = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored): [];
    } catch (error) {
        console.error(`Fout bij het ophalen van favorieten: ${error.message}`);
        return [];   
    }

}

// Checken of een land favoriet is
const isFavourite = (name) =>{
    return getFavourites().includes(name);
}