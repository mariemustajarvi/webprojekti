// Tämä koodi pitää kirjaa mitä tasoja on läpäisty milläkin saarella.



document.addEventListener("DOMContentLoaded", () => {
    const centerIcon = document.querySelector(".center-icon img");
    const outerIcons = document.querySelectorAll(".outer-icons img");

    // ymyprän asettelu
    const circleLayout = document.querySelector(".circle-layout");
    const circleWidth = circleLayout.offsetWidth / 2; // ovaalin vaakasäde
    const circleHeight = circleLayout.offsetHeight / 2; // ovaalin pystysäde
    const centerX = circleWidth; // keskipiste X
    const centerY = circleHeight; // keskipiste Y
    const totalIcons = outerIcons.length; // ulkokehän kuvakkeiden määrää

    // keskimmäisen kuvakkeen säätö
    centerIcon.style.position = "absolute";
    centerIcon.style.left = `${centerX - centerIcon.offsetWidth / 2}px`;
    centerIcon.style.top = `${centerY - centerIcon.offsetHeight / 2}px`;

    // ulkokehän kuvakkeet ovaalin/ympyrän kehälle
    outerIcons.forEach((icon, index) => {
        const angle = (index / totalIcons) * 2 * Math.PI; // jaetaan kuvakkeet kehälle
        const x = centerX + (circleWidth - icon.offsetWidth / 2) * Math.cos(angle) - icon.offsetWidth / 2;
        const y = centerY + (circleHeight - icon.offsetHeight / 2) * Math.sin(angle) - icon.offsetHeight / 2;

        icon.style.position = "absolute";
        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;
    });

    // skaalataan ovaali ja sen sisältö näytön koon mukaan
    window.addEventListener("resize", () => {
        const newCircleWidth = circleLayout.offsetWidth / 2; // uusi ovaalin leveys
        const newCircleHeight = circleLayout.offsetHeight / 2; // uusi ovaalin korkeus
        const newCenterX = newCircleWidth;
        const newCenterY = newCircleHeight;

        // muutetaan keskimmäisen kuvakkeen sijaintis
        centerIcon.style.left = `${newCenterX - centerIcon.offsetWidth / 2}px`;
        centerIcon.style.top = `${newCenterY - centerIcon.offsetHeight / 2}px`;

        // päivitettän ulkokehän kuvakkeiden sijainteja
        outerIcons.forEach((icon, index) => {
            const angle = (index / totalIcons) * 2 * Math.PI;
            const x = newCenterX + (newCircleWidth - icon.offsetWidth / 2) * Math.cos(angle) - icon.offsetWidth / 2;
            const y = newCenterY + (newCircleHeight - icon.offsetHeight / 2) * Math.sin(angle) - icon.offsetHeight / 2;

            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        });
    });
});

