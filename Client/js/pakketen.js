const buttons = document.querySelectorAll(".boek-btn");

buttons.forEach(button => {

    button.addEventListener("click", (e) => {

        e.preventDefault();

        let pakket;

        if (button.dataset.naam === "Basic Pakket") {

            pakket = {
                naam: "Basic Pakket",
                prijs: 695,

                inbegrepen: [
                    "3 uur fotografie",
                    "150+ professionele foto's",
                    "Online gallery in luxe stijl",
                    "Levering binnen 14 dagen"
                ],

                perfectVoor: [
                    "Gemeentehuis ceremonies",
                    "Kleine bruiloften",
                    "Love shoots vooraf"
                ]
            };

        } else if (button.dataset.naam === "Premium Pakket") {

            pakket = {
                naam: "Premium Pakket",
                prijs: 1295,

                inbegrepen: [
                    "6 uur fotografie",
                    "300+ professionele foto's",
                    "Online gallery + USB",
                    "Sneaky preview binnen 48 uur",
                    "Levering binnen 10 dagen"
                ],

                perfectVoor: [
                    "Getting ready",
                    "Ceremonie",
                    "Fotoshoot + receptie"
                ]
            };

        } else {

            pakket = {
                naam: "Luxury Pakket",
                prijs: 1895,

                inbegrepen: [
                    "Hele dag fotografie",
                    "500+ foto's in hoge resolutie",
                    "Luxe 30×30 album",
                    "Dronebeelden",
                    "Sneaky preview binnen 24 uur",
                    "Levering binnen 7 dagen"
                ],

                perfectVoor: [
                    "Van voorbereidingen tot feest",
                    "Complete storytelling"
                ]
            };
        }

        localStorage.setItem(
            "gekozenPakket",
            JSON.stringify(pakket)
        );

        window.location.href = "Boek_pagina.html";
    });
});