'use strict';

const themeToggle = document.getElementById('theme_toggle');

// Vorige voorkeur laden uit localStorage
const loadTheme = () =>{
    const saved= localStorage.getItem('theme');
    if(saved == "dark"){
        document.body.classList.add('dark')
        themeToggle.textContent = 'Light mode';
    }
}

