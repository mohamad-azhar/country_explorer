'use sttrict';

// Haalt de container op waar de kaartjes in komen
const grid = document.getElementById('countries_grid');


// Class die één landenkaartje voorstelt
class CountryCard {
    
    constructor (country){
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

}


