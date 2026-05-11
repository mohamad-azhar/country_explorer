'use strict';

import { isFavourite, toggleFavourites } from './favourite.js';


// Haalt de container op waar de kaartjes in komen
const grid = document.getElementById('countries_grid');


// Class die één landenkaartje voorstelt
class CountryCard {

    // Constructor = wordt uitgevoerd wanneer je een nieuw land maakt
    constructor(country) {

        this.name = country.name.common;
        this.flag = country.flags.svg;
        this.capital = country.capital?.[0] ?? 'Onbekend';
        this.population = country.population.toLocaleString('nl-BE');
        this.area = country.area ? country.area.toLocaleString('nl-BE') + ' km²' : 'Onbekend';
        this.region = country.region;
        this.subregion = country.subregion ?? '—';


        
        // Talen samenvoegen tot een string
        this.languages = country.languages
            ? Object.values(country.languages).join(', ')
            : "Onbekend";

        // Unieke code van het land
        this.cca3 = country.cca3


        //Munteenheid ophalen
        // Controleert of het land currencies (munten) heeft
        this.currency = country.currencies
            // Zet elke currency om naar tekst:
            // bv. "Euro (€)" of "Dollar ($)"
            ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol ?? '?'})`).join(', ') // join Plakt meerdere currencies samen met ", "
            // Als er geen currencies zijn

            : 'Onbekend';
        //favorietstatus checken
        this.fav = isFavourite(this.name);
    }



    // Bouwt het HTML-element op en geeft het terug
    render() {
        // Maakt een nieuw div-element aan
        const card = document.createElement("div");
        // Geeft het een CSS class zodat je het kan stylen
        card.classList.add('country_card')
        // Slaat de landcode op in een data-attribute (voor later gebruik)
        card.dataset.cca3 = this.cca3

        // Zet de volledige HTML inhoud van de kaart
        card.innerHTML = `
        
      <img src="${this.flag}" alt="Vlag van ${this.name}" />
      
      <div class="card-info">
        <h2>${this.name}</h2>
        <table class="card-table">
          <tr><th>Hoofdstad</th><td>${this.capital}</td></tr>
          <tr><th>Bevolking</th><td>${this.population}</td></tr>
          <tr><th>Oppervlakte</th><td>${this.area}</td></tr>
          <tr><th>Regio</th><td>${this.region}</td></tr>
          <tr><th>Subregio</th><td>${this.subregion}</td></tr>
          <tr><th>Talen</th><td>${this.languages}</td></tr>
          <tr><th>Munt</th><td>${this.currency}</td></tr>
        </table>
        <button class="fav-btn ${this.fav ? 'active' : ''}" data-name="${this.name}">
            ${this.fav ? '❤️Opgeslagen' : '🤍Favoriet'}
        </button>
      </div>
    `;

        return card;
    }
}

// Rendert een lijst van landen in het grid
const renderCountries = async (countries) => {
    try {
        // Maakt de grid leeg voordat nieuwe landen worden toegevoegd
        grid.innerHTML = '';

        // Als er geen landen zijn

        if (countries.length === 0) {
            grid.innerHTML = '<p class="no-results">Geen landen gevonden.</p>';
            return;
        }
        // Voor elk land een kaartje aanmaken en toevoegen
        countries.forEach(country => {
            // Maakt een nieuw CountryCard object
            const card = new CountryCard(country);
            // Zet de HTML van die kaart in de grid
            grid.appendChild(card.render());
        });
    } catch (error) {
        // Als er iets fout gaat, toon error in console
        console.error('Fout bij het renderen van landen: ', error.message)
        // Toon foutmelding op de pagina
        grid.innerHTML = '<p class="no-results">Er ging iets mis bij het laden van de landen.</p>';
    }
}




export { renderCountries };