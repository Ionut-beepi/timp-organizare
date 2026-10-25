
document.addEventListener("DOMContentLoaded", function () {
    const butonStart = document.getElementById("start");
    const zonaScor = document.querySelector("#scor p");
    const zonaIntrebare = document.getElementById("intrebare");
    const zonaRaspunsuri = document.getElementById("raspunsuri");
    const zonaMesaj = document.getElementById("mesaj");
    const zonaNumar = document.getElementById("numar-intrebare");

    let scor = 0;
    let indexIntrebare = 0;
    let raspunsDat = false;

    const intrebari = [
        {
            text: "Câte ore necesită o sesiune completă de învățat?",
            variante: [
                "1-2 ore, cu pauze scurte",
                "8-10 ore fără nicio pauză",
                "Doar 5 minute"
            ],
            corect: 0
        },
        {
            text: "Care este cel mai important lucru pentru a avea o rutină reușită?",
            variante: [
                "Să faci totul la întâmplare",
                "Să ai un program realist și să-l respecți constant",
                "Să amâni sarcinile până în ultimul moment"
            ],
            corect: 1
        },
        {
            text: "La care aplicație ar trebui să-ți pui o limită de timp?",
            variante: [
                "Calculator",
                "Calendar",
                "TikTok"
            ],
            corect: 2
        }
    ];

    butonStart.addEventListener("click", function () {
        scor = 0;
        indexIntrebare = 0;
        zonaScor.textContent = "0 XP";
        butonStart.style.display = "none";
        afiseazaIntrebare();
    });

    function afiseazaIntrebare() {
        raspunsDat = false;
        zonaRaspunsuri.innerHTML = "";
        zonaMesaj.textContent = "";

        if (indexIntrebare >= intrebari.length) {
            zonaNumar.textContent = "Quiz finalizat!";
            zonaIntrebare.textContent = "Felicitări! Ai terminat toate întrebările!";
            zonaMesaj.textContent =
                "Scorul tău final este " + scor + " XP din " +
                (intrebari.length * 20) + " XP.";

            const butonRestart = document.createElement("button");
            butonRestart.textContent = "Joacă din nou";

            butonRestart.addEventListener("click", function () {
                scor = 0;
                indexIntrebare = 0;
                zonaScor.textContent = "0 XP";
                afiseazaIntrebare();
            });

            raspunsuri.appendChild(butonRestart);
            return;
        }

        const intrebareCurenta = intrebari[indexIntrebare];

        zonaNumar.textContent =
            "Întrebarea " + (indexIntrebare + 1) +
            " din " + intrebari.length;

        zonaIntrebare.textContent = intrebareCurenta.text;

        intrebareCurenta.variante.forEach(function (varianta, index) {
            const buton = document.createElement("button");
            buton.textContent = varianta;

            buton.addEventListener("click", function () {
                if (raspunsDat) {
                    return;
                }

                raspunsDat = true;

                const toateButoanele =
                    zonaRaspunsuri.querySelectorAll("button");

                toateButoanele.forEach(function (b) {
                    b.disabled = true;
                });

                if (index === intrebareCurenta.corect) {
                    scor += 20;
                    zonaMesaj.textContent = "Corect! Ai câștigat 20 XP!";
                } else {
                    zonaMesaj.textContent =
                        "Răspuns greșit. Varianta corectă era: " +
                        intrebareCurenta.variante[intrebareCurenta.corect];
                }

                zonaScor.textContent = scor + " XP";

                const butonUrmator = document.createElement("button");
                butonUrmator.textContent =
                    indexIntrebare === intrebari.length - 1
                        ? "Vezi rezultatul"
                        : "Următoarea întrebare";

                butonUrmator.addEventListener("click", function () {
                    indexIntrebare++;
                    afiseazaIntrebare();
                });

                zonaRaspunsuri.appendChild(butonUrmator);
            });

            zonaRaspunsuri.appendChild(buton);
        });
    }
});
