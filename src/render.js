'use sttrict';

// Haalt de container op waar de kaartjes in komen
const grid = document.getElementById('countries_grid');


// Class die één landenkaartje voorstelt
class CountryCard {

    constructor(country) {
        this.name = country.name.common;
        this.flag = country.flags.svg;
        this.capital = country.capital?.[0] ?? 'Onbekend';
        this.population = country.population.toLocaleString('nl-BE');
        this.area = country.area ? country.area.toLocaleString('nl-BE') + ' km²' : 'Onbekend';
        this.region = country.region;
        this.subregion = country.subregion ?? '—';
        this.cca3 = country.cca3

        // Talen samenvoegen tot een string
        const languages = country.languages
            ? Object.values(country.languages).join(', ')
            : 'Onbekend';

        //Munteenheid ophalen
        this.currency = country.currencies
            ? Object.values(countries_currencies).map(c => `${c.name} (${c.symbol ?? '?'})`).join(', ')
            : 'Onbekend';
    }

    // Bouwt het HTML-element op en geeft het terug
    render() {
        const card = document.createElement("div");
        card.classList.add('country_card')
        card.dataset.cca3 = this.cca3

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
        <button class="fav-btn" data-name="${this.name}">Favoriet</button>
      </div>
    `;

        return card;
    }
}



