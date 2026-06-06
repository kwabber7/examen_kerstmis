let boekingen =
    JSON.parse(localStorage.getItem("boekingen")) || [];

const lijst =
    document.getElementById("boekingen");

const aantal =
    document.getElementById("aantal");

const omzet =
    document.getElementById("omzet");

function render() {

    lijst.innerHTML = "";

    aantal.textContent =
        `Aantal boekingen: ${boekingen.length}`;

    const totaleOmzet =
        boekingen.reduce(
            (som, boeking) => som + boeking.prijs,
            0
        );

    omzet.textContent =
        `Totale omzet: €${totaleOmzet}`;

    boekingen.forEach(boeking => {

        lijst.innerHTML += `
        <div class="boeking-card">

            <h2>${boeking.pakketNaam}</h2>

            <p><strong>Klant:</strong> ${boeking.naam}</p>

            <p><strong>Locatie:</strong> ${boeking.locatie}</p>

            <p><strong>Telefoon:</strong> ${boeking.telefoon}</p>

            <h3>Inbegrepen</h3>

            <ul>
                ${boeking.inbegrepen
                ? boeking.inbegrepen
                    .map(item => `<li>${item}</li>`)
                    .join("")
                : "<li>Geen gegevens beschikbaar</li>"
            }
            </ul>

            <h3>Perfect voor</h3>

            <ul>
                ${boeking.perfectVoor
                ? boeking.perfectVoor
                    .map(item => `<li>${item}</li>`)
                    .join("")
                : "<li>Geen gegevens beschikbaar</li>"
            }
            </ul>

            <h3>Extra opties</h3>

            <ul>
                ${boeking.extras && boeking.extras.length > 0
                ? boeking.extras
                    .map(extra => `<li>${extra}</li>`)
                    .join("")
                : "<li>Geen extra opties gekozen</li>"
            }
            </ul>

            <p class="prijs">
                €${boeking.prijs}
            </p>

            <button onclick="verwijderBoeking(${boeking.id})">
                Verwijderen
            </button>

        </div>
        `;
    });
}

function verwijderBoeking(id) {

    boekingen = boekingen.filter(
        boeking => boeking.id !== id
    );

    localStorage.setItem(
        "boekingen",
        JSON.stringify(boekingen)
    );

    render();
}

window.verwijderBoeking =
    verwijderBoeking;

document
    .getElementById("sorteren")
    .addEventListener("change", e => {

        if (e.target.value === "laag") {

            boekingen.sort(
                (a, b) => a.prijs - b.prijs
            );

        } else {

            boekingen.sort(
                (a, b) => b.prijs - a.prijs
            );

        }

        render();
    });

render();