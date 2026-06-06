const container = document.getElementById("gekozen-pakket");

const pakket =
    JSON.parse(localStorage.getItem("gekozenPakket"));

let totaalPrijs = pakket.prijs;

container.innerHTML = `
<div class="boek-card">

    <h2>${pakket.naam}</h2>

    <p class="prijs" id="prijs">
        €${pakket.prijs}
    </p>

    <h3>Extra opties</h3>

    <label>
        Extra uren (€100/u)
        <input
            type="number"
            id="uren"
            min="0"
            value="0">
    </label>

    <label>
        <input type="checkbox" id="drone">
        Dronebeelden (+ €300)
    </label>

    <label>
        <input type="checkbox" id="album">
        Luxe album (+ €250)
    </label>

    <label>
        <input type="checkbox" id="verloving">
        Verlovingsshoot (+ €400)
    </label>

    <label>
        <input type="checkbox" id="snel">
        Snelle levering (+ €200)
    </label>

    <hr>

    <h3>Jouw gegevens</h3>

    <input
        type="text"
        id="naam"
        placeholder="Naam"
        required>

    <input
        type="text"
        id="locatie"
        placeholder="Locatie"
        required>

    <input
        type="tel"
        id="telefoon"
        placeholder="Telefoonnummer"
        required>

    <div id="foutmelding" class="foutmelding"></div>

    <button id="boek">
        Boeking bevestigen
    </button>

    <button id="naar-overzicht" class="overzicht-btn">
        Bekijk alle boekingen
    </button>

</div>
`;

function formatTelefoon(nummer) {

    nummer = nummer.replace(/\D/g, "");

    if (nummer.length === 10) {
        return `${nummer.slice(0, 4)} ${nummer.slice(4, 6)} ${nummer.slice(6, 8)} ${nummer.slice(8, 10)}`;
    }

    return nummer;
}

document
    .getElementById("naar-overzicht")
    .addEventListener("click", () => {

        window.location.href =
            "overzicht_boekinge.html";

    });

const prijsElement =
    document.getElementById("prijs");

function berekenPrijs() {

    totaalPrijs = pakket.prijs;

    const uren =
        Number(document.getElementById("uren").value);

    totaalPrijs += uren * 100;

    if (document.getElementById("drone").checked)
        totaalPrijs += 300;

    if (document.getElementById("album").checked)
        totaalPrijs += 250;

    if (document.getElementById("verloving").checked)
        totaalPrijs += 400;

    if (document.getElementById("snel").checked)
        totaalPrijs += 200;

    prijsElement.textContent =
        `€${totaalPrijs}`;
}

document
    .getElementById("uren")
    .addEventListener("input", berekenPrijs);

document
    .getElementById("drone")
    .addEventListener("change", berekenPrijs);

document
    .getElementById("album")
    .addEventListener("change", berekenPrijs);

document
    .getElementById("verloving")
    .addEventListener("change", berekenPrijs);

document
    .getElementById("snel")
    .addEventListener("change", berekenPrijs);

document
    .getElementById("boek")
    .addEventListener("click", () => {

        const naam =
            document.getElementById("naam")
                .value.trim();

        const locatie =
            document.getElementById("locatie")
                .value.trim();

        const telefoon =
            document.getElementById("telefoon")
                .value.trim();

        const telefoonSchoon =
            telefoon.replace(/\D/g, "");

        const fouten = [];

        if (!naam)
            fouten.push("Naam");

        if (!locatie)
            fouten.push("Locatie");

        if (!telefoon)
            fouten.push("Telefoonnummer");
        else if (!/^0\d{9}$/.test(telefoonSchoon))
            fouten.push("Geldig gsm-nummer");

        const foutmelding =
            document.getElementById("foutmelding");

        if (fouten.length > 0) {

            foutmelding.textContent =
                "Vul de volgende velden in: " +
                fouten.join(", ");

            return;
        }

        foutmelding.textContent = "";

        const extras = [];

        if (document.getElementById("drone").checked)
            extras.push("Dronebeelden");

        if (document.getElementById("album").checked)
            extras.push("Luxe album");

        if (document.getElementById("verloving").checked)
            extras.push("Verlovingsshoot");

        if (document.getElementById("snel").checked)
            extras.push("Snelle levering");

        const boeking = {

            id: Date.now(),

            pakketNaam: pakket.naam,

            inbegrepen: pakket.inbegrepen,

            perfectVoor: pakket.perfectVoor,

            extras: extras,

            naam: naam,

            locatie: locatie,

            telefoon: formatTelefoon(telefoon),

            prijs: totaalPrijs
        };

        const boekingen =
            JSON.parse(
                localStorage.getItem("boekingen")
            ) || [];

        boekingen.push(boeking);

        localStorage.setItem(
            "boekingen",
            JSON.stringify(boekingen)
        );

        window.location.href =
            "overzicht_boekinge.html";
    });
