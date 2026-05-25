// =======================================
// TV PARTY GAMES - MAIN ENGINE
// =======================================

// Apertura giochi

function openGame(path) {

    // Animazione uscita
    document.body.style.opacity = "0";

    // Cambio pagina
    setTimeout(() => {

        window.location.href = path;

    }, 300);

}

// Fade iniziale

window.onload = () => {

    document.body.style.opacity = "1";

}

// Effetto particelle casuali

createParticles();

function createParticles() {

    for(let i = 0; i < 25; i++) {

        const particle = document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
            Math.random() * window.innerWidth + "px";

        particle.style.top =
            Math.random() * window.innerHeight + "px";

        particle.style.animationDuration =
            (Math.random() * 10 + 5) + "s";

        document.body.appendChild(particle);

    }

}

// Debug

console.log("TV PARTY GAMES LOADED");