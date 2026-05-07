'use strict';

// De URL van de API met de velden die we nodig hebben
const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,area,region,subregion,languages,currencies,cca3';

// Async functie om alle landen op te halen
const fetchCountries = async () => {
    // Eerst kijken of de data al opgeslagen is in de browser (cache)
    const cached = localStorage.getItem('countries_cache');
    // Als er cache bestaat, gebruiken we die meteen
    if (cached) {
        console.log("Data geladen uit cache");
        return JSON.parse(cached); // Zet tekst om naar echte data en return
    }
    // Als er geen cache is, halen we data op via de API
    const response = await fetch(API_URL);
    
    // Controleer of de request gelukt is
    if(!response.ok){
        throw new Error ("API fout", response.status);
    }

    const data = await response.json();

      // Data opslaan in localStorage als cache
    localStorage.setItem("countries_cache", JSON.stringify(data));
    console.log(data.length, ' landen opgehaald van de API');

    return data;

}

export {fetchCountries};