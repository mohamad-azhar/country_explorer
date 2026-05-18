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

// Filters toepassen en opnieuw renderen
const update = () => {
    const source = showingFavourites
        ? allCountries.filter(c => getFavourites().includes(c.name.common))
        : allCountries;

    const filtered = applyFilters(source);
    renderCountries(filtered);
    attachFavouriteEvents();
    observeCards();
}

// Klik events op favoriet-knoppen koppelen (na elke render opnieuw)
const attachFavouriteEvents = () => {
    document.querySelectorAll('.fav_btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            toggleFavourite(name);
            update();
        })
    })
}

// Favorieten-knop toggle
showFavBtn.addEventListener('click', () => {
    showingFavourites = !showingFavourites;
    showFavBtn.textContent = showingFavourites ? '🌍 Alle landen' : '❤️ Favorieten';
    update();
})

// Zoeken
searchInput.addEventListener('input', () => update());

// Filteren op regio
regionSelect.addEventListener('change', () => update())

// sorteren
sortSelect.addEventListener('change', () => update());

// Observer API — lazy loading van kaartjes
const observeCards = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // stoppen na eerste keer
            }
        })
    }, { threshold: 0.1 });
    document.querySelectorAll('.country_card').forEach(card => {
        observer.observe(card);
    })
}



// App initialiseren
const init = async () => {
    // Definieert een async functie die de app opstart
    initTheme();
    try {
        allCountries = await fetchCountries();// globale variabele vullen
        update();
        observeCards();
    } catch (error) {
        errorMsg.textContent = `Er ging iets mis: ${error.message}`;
        errorMsg.classList.remove('error_hidden');
        console.error(error);
    } finally {
        console.info('App initialisatie afgerond.');
    }


}
window.addEventListener('load', () => {
    init();
})