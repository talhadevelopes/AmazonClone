let calculation = '';

function evaluateCalculation(value) {
    calculation += value;
    displayCalculation();
    saveData();
}

function displayCalculation() {
    document.querySelector('.displayCalculation').innerHTML = calculation || '0'; 
}

function calculateResult() {
    try {
        calculation = eval(calculation) || ''; 
    } catch (error) {
        calculation = 'Error'; 
    }
    displayCalculation();
    saveData();
}

function clearCalculation() {
    calculation = '';
    displayCalculation();
    saveData();
}

function saveData() {
    localStorage.setItem('calculation', calculation);
}

function showData() {
    calculation = localStorage.getItem('calculation') || ''; 
    displayCalculation();
}

showData();

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');


/**
 * 
 * // Check and toggle 'dark-mode'
if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
} else {
    document.body.classList.add('dark-mode');
}

// Check and toggle 'light-mode'
if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
} else {
    document.body.classList.add('light-mode');
}

 * 
*/

    const modeButton = document.querySelector('.mode-button');
    if (document.body.classList.contains('dark-mode')) {
        modeButton.innerHTML = 'Dark Mode <i class="fa-solid fa-moon"></i>';
        localStorage.setItem('mode', 'dark');
    } else {
        modeButton.innerHTML = 'Light Mode <i class="fa-solid fa-sun"></i>';
        localStorage.setItem('mode', 'light');
    }
}
function loadSavedMode() {
    const savedMode = localStorage.getItem('mode');
    const modeButton = document.querySelector('.mode-button');

    if (savedMode === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        modeButton.innerHTML = 'Dark Mode <i class="fa-solid fa-moon"></i>';
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        modeButton.innerHTML = 'Light Mode <i class="fa-solid fa-sun"></i>';
    }
}

document.querySelector('.mode-button').addEventListener('click', toggleDarkMode);
loadSavedMode();