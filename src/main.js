'use strict'
import { fetchCountries } from './api.js' // Haalt de functie fetchCountries binnen uit api.js (data ophalen)
import { renderCountries } from './render.js' // Haalt de functie renderCountries binnen uit render.js (weergave op scherm)
import { applyFilters } from './filter.js' 
import { getFavourites, toggleFavourite } from './favourite.js' 
import { initTheme } from './theme.js' 


// Foutmelding element
const errorMsg = document.getElementById('error_msg');
// Zoekt in de HTML naar het element met id "error-msg" om fouten te tonen

const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('filter_region');
const sortSelect = document.getElementById('sort');
const showFavBtn = document.getElementById('show_favourites');
const grid = document.getElementById('countries_grid');

// Globale variabele om alle landen bij te houden
let allCountries = [];
let showingFavourites = false;

// App initialiseren
const init = async ()=> {
    // Definieert een async functie die de app opstart
    try {
        const countries = await fetchCountries();
        renderCountries(countries);
    } catch (error) {
        // Foutmelding tonen aan de gebruiker
        errorMsg.textContent = `Er ging iets mis: ${error.message}`;
        errorMsg.classList.remove('error_hidden');
        console.error(error);
    }finally{
        console.info('App initialisatie afgerond.');
    }

}
window.addEventListener('load', ()=>{
    init();
})