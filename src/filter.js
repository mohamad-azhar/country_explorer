'use strict';


// Filtert en sorteert de landen op basis van de huidige waarden in de UI
const applyFilters = (countries) => {
    try {
        // Waarden ophalen uit de UI elementen
        const searchValue = document.getElementById('search').value.toLowercase().trim();
        const regionValue = document.getElementById('filter_region').value;
        const sortValue = document.getElementById('sort').value;

        // Validatie: zoekterm mag niet korter zijn dan 2 tekens (tenzij leeg)
        if (searchValue.length === 1) {
            return countries; //nog niet filtreren bij een karakter
        }

        //filtreren op zoekterm
        let result = countries.filter(country => {
            const name = country.name.common.toLowercase();
            return name.includes(searchValue);
        })

        //filtreren op regio
        if (regionValue !== '') {
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
                return a.population -b.population
            }
            if (sortValue === 'area_desc') {
                return (b.area ?? 0) - (a.area ?? 0);
            }
        })


    } catch (error) {

    }
}
