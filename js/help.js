/**
 * Opens the section window with the description
 * @param {Number} i Number of the help section
 */
function showSection(i) {
    let section = document.getElementById('description' + i);
    let chevron = document.getElementById('chevron' + i);
    if (notOpen(section)) {
        openDescription(chevron, section);
    }
    else {
        closeDescription(chevron, section);
    }
}

/**
 * check if the class list contains dNone
 * @param {Element} section description + i
 * @returns true or false
 */
function notOpen(section) {
    return section.classList.contains('dNone');
}

/**
 * Open the window of the description and rotate the chevron
 * @param {Element} chevron img of the chevron
 * @param {Element} section description + i
 */
function openDescription(chevron, section) {
    section.classList.toggle('dNone');
    section.style.height = '0';
    setTimeout(() => {
        section.style.height = '100%';
        chevron.style.transform = 'rotate(180deg)'
    }, 10);
}

/**
 * Close the descrition window and rotate the chevron back
 * @param {Element} chevron img of the chevron
 * @param {Element} section description + i
 */
function closeDescription(chevron, section){
    section.style.height = '0';
    chevron.style.transform = 'unset'
    setTimeout(() => {
        section.classList.toggle('dNone');
    }, 255);
}