'use strict'
import { fetchCountries } from './api.js' // Haalt de functie fetchCountries binnen uit api.js (data ophalen)
import { renderCountries } from './render.js' // Haalt de functie renderCountries binnen uit render.js (weergave op scherm)


// Foutmelding element
const errorMsg = document.getElementById('error_msg');
// Zoekt in de HTML naar het element met id "error-msg" om fouten te tonen

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