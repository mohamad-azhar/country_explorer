'use strict'
import { fetchCountries } from './api.js' // Haalt de functie fetchCountries binnen uit api.js (data ophalen)
import { renderCountries } from './render.js' // Haalt de functie renderCountries binnen uit render.js (weergave op scherm)
import { applyFilters } from './filter.js'
import { getFavourites, toggleFavourite, isFavourite } from './favourite.js'
import { initTheme } from './theme.js'


// Foutmelding element
const errorMsg = document.getElementById('error_msg');
// Zoekt in de HTML naar het element met id "error-msg" om fouten te tonen

const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('filter_region');
const sortSelect = document.getElementById('sort');
const showFavBtn = document.getElementById('show_favourites');
const grid = document.getElementById('countries_grid');
const modalOverlay = document.getElementById('modal_overlay')
const modalContent = document.getElementById('modal_content')
const modalClose = document.getElementById('modal_close')



// Globale variabele om alle landen bij te houden
let allCountries = [];
let showingFavourites = false;





// Modal openen
const openModal = (country) => {
    const languages = country.languages
        ? Object.values(country.languages).join(', ')
        : 'Onbekend';

    const currency = country.currencies
        ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol ?? '?'})`).join(', ')
        : 'Onbekend';

    const area = country.area
        ? country.area.toLocaleString('nl-BE') + ' km²'
        : 'Onbekend';

    modalContent.innerHTML = `
        <div class="modal_content_inner">
            <img src="${country.flags.svg}" alt="Vlag van ${country.name.common}" />
            <h2>${country.name.common}</h2>
            <table class="card_table">
                <tr><th>Hoofdstad</th><td>${country.capital?.[0] ?? 'Onbekend'}</td></tr>
                <tr><th>Bevolking</th><td>${country.population.toLocaleString('nl-BE')}</td></tr>
                <tr><th>Oppervlakte</th><td>${area}</td></tr>
                <tr><th>Regio</th><td>${country.region}</td></tr>
                <tr><th>Subregio</th><td>${country.subregion ?? '—'}</td></tr>
                <tr><th>Talen</th><td>${languages}</td></tr>
                <tr><th>Munt</th><td>${currency}</td></tr>
            </table>
            <button class="fav_btn ${isFavourite(country.name.common) ? 'active' : ''}" data-name="${country.name.common}">
                ${isFavourite(country.name.common) ? '❤️ Opgeslagen' : '🤍 Favoriet'}
            </button>
        </div>
    `;
    modalOverlay.classList.add('active');
}

// Modal sluiten
modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Sluiten als je buiten de modal klikt
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});


// Kaar events
const attachCardEvents = () => {
    document.querySelectorAll('.country_card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.fav_btn')) return;
            const cca3 = card.dataset.cca3;
            const country = allCountries.find(c => c.cca3 === cca3);
            if (country) openModal(country);
        });
    });
}

// Filters toepassen en opnieuw renderen
const update = () => {
    const source = showingFavourites
        ? allCountries.filter(c => getFavourites().includes(c.name.common))
        : allCountries;

    const filtered = applyFilters(source);
    renderCountries(filtered);
    attachFavouriteEvents();
    attachCardEvents(); // ← nieuw
    observeCards();;
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