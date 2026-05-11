'use strict';


// Filtert en sorteert de landen op basis van de huidige waarden in de UI
const applyFilters = (countries) => {
    try {
        // Waarden ophalen uit de UI elementen
        const searchValue = document.getElementById('search').value.toLowerCase().trim(); //zet alles om naar kleine letters en verwijdert spaties voor/achteraan
        const regionValue = document.getElementById('filter_region').value;
        const sortValue = document.getElementById('sort').value;

        // Validatie: zoekterm mag niet korter zijn dan 2 tekens (tenzij leeg)
        //Als de gebruiker maar 1 letter heeft ingevoerd, wordt er nog niet gefilterd
        if (searchValue.length === 1) {
            return countries; //nog niet filtreren bij een karakter
        }

        //filtreren op zoekterm
        let result = countries.filter(country => {
            // Naam van het land in kleine letters zetten
            const name = country.name.common.toLowerCase();
            // Controleert of de zoekterm voorkomt in de naam
            return name.includes(searchValue);
        })

        //filtreren op regio    
        // Enkel uitvoeren als een regio geselecteerd is
        if (regionValue !== '') {
            // Houdt enkel landen van de gekozen regio over
            result = result.filter(country => country.region === regionValue);
        }


        // sorteren
        result = result.sort((a, b) => {
            if (sortValue === 'name_asc') {
                return a.name.common.localeCompare(b.name.common);
            }
            if (sortValue === 'name_desc') {
                return b.name.common.localeCompare(a.name.common);
            }
            if (sortValue === 'pop_desc') {
                return b.population - a.population;
            }
            if (sortValue === 'pop_asc') {
                return a.population - b.population
            }
            if (sortValue === 'area_desc') {
                return (b.area ?? 0) - (a.area ?? 0);
            }
            return 0;
        });
        // Geeft de gefilterde en gesorteerde lijst terug
        return result;


    } catch (error) {
        // Toont foutmelding in de console
        console.error(`Fout bij het filteren van landen: ${error.message}`);
        // Geeft originele lijst terug bij fout
        return countries;

    }
}



export {applyFilters};