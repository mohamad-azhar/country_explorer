'use sttrict';

// Haalt de container op waar de kaartjes in komen
const grid = document.getElementById('countries_grid');

// Maakt 1 kaartje voor 1 land
const creatCard = (country) => {
    const name = country.name.common;
    const flag = country.flags.svg;
    const capital = country.capital?.[0] ?? 'Onbekend';
    const population = country.population.toLocaleString('nl-BE');
    const area = country.area ? country.area.toLocaleString('nl-BE') + ' km²' : 'Onbekend';
    const region = country.region;
    const subregion = country.subregion ?? '—';

    // Talen samenvoegen tot een string
    const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'Onbekend';

    //Munteenheid ophalen
    this.currency = country.currencies
    ? Object.values(countries_currencies).map(c => `${c.name} (${c.symbol ?? '?'})`).join(', ')
    : 'Onbekend';
}
