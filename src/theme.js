'use strict';

const themeToggle = document.getElementById('theme_toggle');

// Vorige voorkeur laden uit localStorage
const loadTheme = () => {
    // Haalt het opgeslagen thema op uit localStorage
    const saved = localStorage.getItem('theme');
    if (saved == "dark") {
        // Voegt de class "dark" toe aan de body zodat dark mode actief wordt
        document.body.classList.add('dark')
        // Verandert de tekst van de knop zodat gebruiker kan terugwisselen naar light mode
        themeToggle.textContent = 'Light mode';
    }
};

// Thema wisselen bij klik
const initTheme = () => {
    // Laadt eerst het eerder opgeslagen thema
    loadTheme();
    // Voegt een klik-event toe aan de knop
    themeToggle.addEventListener('click', () => {
        try {
            // Zet de class "dark" aan of uit
            document.body.classList.toggle('dark')
            // Controleert of dark mode momenteel actief is
            const isDark = document.body.classList.contains('dark');
            // Voorkeur opslaan in localStorage
            // Slaat de huidige voorkeur op in localStorage
            // Als dark mode actief is → "dark"
            // Anders → "light"
            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            // Past de tekst van de knop aan zodat gebruiker ziet naar welke mode hij kan wisselen
            themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        } catch (error) {
            // Toont foutmelding in de console als er iets misgaat bij het opslaan
            console.error(`Fout bij het opslaan van het thema: ${error.message}`);
        }
    })
}

export { initTheme };