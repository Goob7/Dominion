/* =========================================================
   GRAND STRATEGY
   PROTOTYPE v1.0
========================================================= */


/* =========================================================
   COUNTRY DATA
========================================================= */

const countries = {

    Northland: {
        population: 82000,
        money: 700,
        military: 40,
        technology: 2,
        economy: 65,
        government: "Monarchy",
        personality: "Expansionist",
        territories: 1
    },

    Eastland: {
        population: 115000,
        money: 1200,
        military: 55,
        technology: 3,
        economy: 82,
        government: "Republic",
        personality: "Trader",
        territories: 1
    },

    Southland: {
        population: 97000,
        money: 900,
        military: 48,
        technology: 2,
        economy: 71,
        government: "Kingdom",
        personality: "Defensive",
        territories: 1
    },

    Westland: {
        population: 63000,
        money: 500,
        military: 31,
        technology: 1,
        economy: 54,
        government: "Republic",
        personality: "Peaceful",
        territories: 1
    },

    Centralia: {
        population: 143000,
        money: 1600,
        military: 72,
        technology: 4,
        economy: 91,
        government: "Empire",
        personality: "Aggressive",
        territories: 1
    },

    Highlands: {
        population: 42000,
        money: 400,
        military: 27,
        technology: 1,
        economy: 43,
        government: "Tribal",
        personality: "Isolationist",
        territories: 1
    }

};


/* =========================================================
   DIPLOMACY
========================================================= */

let relations = {};
let diplomaticStatuses = {};


function initializeDiplomacy() {

    relations = {};
    diplomaticStatuses = {};

    const names =
        Object.keys(countries);


    names.forEach(function(countryA) {

        relations[countryA] = {};
        diplomaticStatuses[countryA] = {};


        names.forEach(function(countryB) {

            if (countryA === countryB) {
                return;
            }


            relations[countryA][countryB] =
                Math.floor(
                    Math.random() * 61
                ) - 20;


            diplomaticStatuses[countryA][countryB] =
                "Peace";

        });

    });

}


initializeDiplomacy();


/* =========================================================
   GAME VARIABLES
========================================================= */

let playerCountry = null;

let year = 1427;

let gameRunning = false;

let gameSpeed = 1000;

let gameTimer = null;

let selectedTerritory = null;

let gameWon = false;


/* =========================================================
   HTML ELEMENTS
========================================================= */

const nationScreen =
    document.getElementById(
        "nation-screen"
    );

const gameScreen =
    document.getElementById(
        "game-screen"
    );

const nationChoices =
    document.querySelectorAll(
        ".nation-choice"
    );

const territories =
    document.querySelectorAll(
        ".territory"
    );


const playerCountryName =
    document.getElementById(
        "player-country-name"
    );

const moneyDisplay =
    document.getElementById(
        "money"
    );

const populationDisplay =
    document.getElementById(
        "population"
    );

const militaryDisplay =
    document.getElementById(
        "military"
    );

const technologyDisplay =
    document.getElementById(
        "technology"
    );

const yearDisplay =
    document.getElementById(
        "year"
    );


const noSelection =
    document.getElementById(
        "no-selection"
    );

const countryInfo =
    document.getElementById(
        "country-info"
    );

const selectedCountry =
    document.getElementById(
        "selected-country"
    );

const selectedCity =
    document.getElementById(
        "selected-city"
    );

const selectedPopulation =
    document.getElementById(
        "selected-population"
    );

const selectedEconomy =
    document.getElementById(
        "selected-economy"
    );

const selectedMilitary =
    document.getElementById(
        "selected-military"
    );

const selectedTechnology =
    document.getElementById(
        "selected-technology"
    );

const selectedGovernment =
    document.getElementById(
        "selected-government"
    );

const selectedPersonality =
    document.getElementById(
        "selected-personality"
    );


const selectedRelations =
    document.getElementById(
        "selected-relations"
    );

const selectedDiplomaticStatus =
    document.getElementById(
        "selected-diplomatic-status"
    );


const relationsButton =
    document.getElementById(
        "relations-button"
    );

const tradeButton =
    document.getElementById(
        "trade-button"
    );

const napButton =
    document.getElementById(
        "nap-button"
    );

const warButton =
    document.getElementById(
        "war-button"
    );


const armyDisplay =
    document.getElementById(
        "army-display"
    );

const territoryDisplay =
    document.getElementById(
        "territory-display"
    );

const attackButton =
    document.getElementById(
        "attack-button"
    );


const buildButton =
    document.getElementById(
        "build-button"
    );

const recruitButton =
    document.getElementById(
        "recruit-button"
    );

const researchButton =
    document.getElementById(
        "research-button"
    );


const playButton =
    document.getElementById(
        "play-button"
    );

const pauseButton =
    document.getElementById(
        "pause-button"
    );

const speed1Button =
    document.getElementById(
        "speed1-button"
    );

const speed2Button =
    document.getElementById(
        "speed2-button"
    );

const speed5Button =
    document.getElementById(
        "speed5-button"
    );

const restartButton =
    document.getElementById(
        "restart-button"
    );

const gameStatus =
    document.getElementById(
        "game-status"
    );


const warNotification =
    document.getElementById(
        "war-notification"
    );

const warReport =
    document.getElementById(
        "war-report"
    );

const closeWarReport =
    document.getElementById(
        "close-war-report"
    );


const victoryScreen =
    document.getElementById(
        "victory-screen"
    );

const victoryMessage =
    document.getElementById(
        "victory-message"
    );

const victoryTerritories =
    document.getElementById(
        "victory-territories"
    );

const victoryYear =
    document.getElementById(
        "victory-year"
    );

const victoryRestart =
    document.getElementById(
        "victory-restart"
    );


/* =========================================================
   COUNTRY COLORS
========================================================= */

const countryColors = {

    Northland: "#4d963f",

    Eastland: "#c09a27",

    Southland: "#ad6048",

    Westland: "#7657a8",

    Centralia: "#c05b7b",

    Highlands: "#5d707a"

};


/* =========================================================
   CHOOSE NATION
========================================================= */

nationChoices.forEach(function(choice) {

    choice.addEventListener(
        "click",
        function() {

            playerCountry =
                choice.dataset.country;

            nationScreen.classList.add(
                "hidden"
            );

            gameScreen.classList.remove(
                "hidden"
            );

            playerCountryName.textContent =
                playerCountry;

            updatePlayerDisplay();

        }
    );

});


/* =========================================================
   PLAYER DISPLAY
========================================================= */

function updatePlayerDisplay() {

    if (!playerCountry) {
        return;
    }


    const player =
        countries[playerCountry];


    moneyDisplay.textContent =
        Math.floor(player.money);


    populationDisplay.textContent =
        player.population.toLocaleString();


    militaryDisplay.textContent =
        Math.floor(player.military);


    technologyDisplay.textContent =
        player.technology;


    yearDisplay.textContent =
        year;

}


/* =========================================================
   TERRITORY CLICK
========================================================= */

territories.forEach(function(territory) {

    territory.addEventListener(
        "click",
        function() {

            if (gameWon) {
                return;
            }


            territories.forEach(
                function(other) {

                    other.classList.remove(
                        "selected"
                    );

                }
            );


            territory.classList.add(
                "selected"
            );


            selectedTerritory =
                territory;


            updateCountryPanel();

        }
    );

});


/* =========================================================
   COUNTRY INFORMATION
========================================================= */

function updateCountryPanel() {

    if (!selectedTerritory) {
        return;
    }


    noSelection.classList.add(
        "hidden"
    );

    countryInfo.classList.remove(
        "hidden"
    );


    const name =
        selectedTerritory.dataset.country;


    const city =
        selectedTerritory.dataset.city;


    const country =
        countries[name];


    if (!country) {

        console.error(
            "Country not found:",
            name
        );

        return;
    }


    selectedCountry.textContent =
        name;


    selectedCity.textContent =
        city;


    selectedPopulation.textContent =
        country.population.toLocaleString();


    selectedEconomy.textContent =
        country.economy;


    selectedMilitary.textContent =
        Math.floor(
            country.military
        );


    selectedTechnology.textContent =
        country.technology;


    selectedGovernment.textContent =
        country.government;


    selectedPersonality.textContent =
        country.personality;


    armyDisplay.textContent =
        Math.floor(
            country.military
        );


    territoryDisplay.textContent =
        country.territories;


    updateDiplomacyDisplay(name);

}


/* =========================================================
   DIPLOMACY DISPLAY
========================================================= */

function updateDiplomacyDisplay(name) {

    if (name === playerCountry) {

        selectedRelations.textContent =
            "Your Nation";


        selectedDiplomaticStatus.textContent =
            "You control this nation";


        relationsButton.disabled = true;

        tradeButton.disabled = true;

        napButton.disabled = true;

        warButton.disabled = true;

        attackButton.disabled = true;

        return;

    }


    relationsButton.disabled = false;

    tradeButton.disabled = false;

    napButton.disabled = false;

    warButton.disabled = false;


    const relation =
        relations[
            playerCountry
        ][name];


    const status =
        diplomaticStatuses[
            playerCountry
        ][name];


    selectedRelations.textContent =
        relation;


    selectedDiplomaticStatus.textContent =
        status;


    attackButton.disabled =
        status !== "WAR";

}


/* =========================================================
   CHANGE RELATIONS
========================================================= */

function changeRelations(
    countryA,
    countryB,
    amount
) {

    relations[countryA][countryB] +=
        amount;


    relations[countryB][countryA] +=
        amount;


    relations[countryA][countryB] =
        Math.max(
            -100,
            Math.min(
                100,
                relations[countryA][countryB]
            )
        );


    relations[countryB][countryA] =
        Math.max(
            -100,
            Math.min(
                100,
                relations[countryB][countryA]
            )
        );

}


/* =========================================================
   IMPROVE RELATIONS
========================================================= */

relationsButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {
            return;
        }


        const target =
            selectedTerritory.dataset.country;


        if (target === playerCountry) {
            return;
        }


        const player =
            countries[playerCountry];


        if (player.money < 50) {

            alert(
                "You need 50 gold."
            );

            return;
        }


        player.money -= 50;


        changeRelations(
            playerCountry,
            target,
            10
        );


        updatePlayerDisplay();

        updateCountryPanel();


        alert(
            "🤝 Relations improved with " +
            target +
            "!"
        );

    }
);


/* =========================================================
   TRADE
========================================================= */

tradeButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {
            return;
        }


        const target =
            selectedTerritory.dataset.country;


        const relation =
            relations[
                playerCountry
            ][target];


        if (relation < 0) {

            alert(
                "❌ " +
                target +
                " rejected your trade offer."
            );

            return;
        }


        const player =
            countries[playerCountry];


        if (player.money < 100) {

            alert(
                "You need 100 gold."
            );

            return;
        }


        player.money -= 100;


        changeRelations(
            playerCountry,
            target,
            15
        );


        diplomaticStatuses[
            playerCountry
        ][target] =
            "Trade Agreement";


        diplomaticStatuses[
            target
        ][playerCountry] =
            "Trade Agreement";


        updatePlayerDisplay();

        updateCountryPanel();


        alert(
            "💰 Trade agreement signed with " +
            target +
            "!"
        );

    }
);


/* =========================================================
   NON-AGGRESSION PACT
========================================================= */

napButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {
            return;
        }


        const target =
            selectedTerritory.dataset.country;


        const relation =
            relations[
                playerCountry
            ][target];


        if (relation < -10) {

            alert(
                "❌ " +
                target +
                " refused the pact."
            );

            return;
        }


        diplomaticStatuses[
            playerCountry
        ][target] =
            "Non-Aggression Pact";


        diplomaticStatuses[
            target
        ][playerCountry] =
            "Non-Aggression Pact";


        changeRelations(
            playerCountry,
            target,
            5
        );


        updateCountryPanel();


        alert(
            "🛡️ Non-Aggression Pact signed!"
        );

    }
);


/* =========================================================
   DECLARE WAR
========================================================= */

warButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {

            alert(
                "Select a country first."
            );

            return;
        }


        const target =
            selectedTerritory.dataset.country;


        if (target === playerCountry) {

            alert(
                "You cannot declare war on yourself."
            );

            return;
        }


        const status =
            diplomaticStatuses[
                playerCountry
            ][target];


        if (status === "WAR") {

            alert(
                "You are already at war with " +
                target +
                "!"
            );

            return;
        }


        const confirmed =
            confirm(
                "⚔️ DECLARE WAR\n\n" +
                "Declare war on " +
                target +
                "?"
            );


        if (!confirmed) {
            return;
        }


        diplomaticStatuses[
            playerCountry
        ][target] =
            "WAR";


        diplomaticStatuses[
            target
        ][playerCountry] =
            "WAR";


        relations[
            playerCountry
        ][target] =
            -100;


        relations[
            target
        ][playerCountry] =
            -100;


        updateCountryPanel();


        alert(
            "⚔️ WAR DECLARED!\n\n" +
            playerCountry +
            " is now at war with " +
            target +
            "!"
        );

    }
);


/* =========================================================
   CONQUER TERRITORY
========================================================= */

function conquerTerritory(
    territory,
    attackerName,
    defenderName
) {

    /*
       IMPORTANT:
       We keep the original CSS class.

       That means the territory stays
       in exactly the same place.
    */


    territory.dataset.country =
        attackerName;


    territory.style.display =
        "flex";


    territory.textContent =
        attackerName;


    territory.style.backgroundColor =
        countryColors[
            attackerName
        ];


    /*
       Update territory ownership.
    */

    if (
        countries[
            defenderName
        ].territories > 0
    ) {

        countries[
            defenderName
        ].territories--;

    }


    countries[
        attackerName
    ].territories++;


    /*
       Check for total victory.
    */

    checkVictory();

}


/* =========================================================
   CHECK VICTORY
========================================================= */

function checkVictory() {

    if (
        !playerCountry ||
        gameWon
    ) {

        return;
    }


    const totalTerritories =
        territories.length;


    const playerTerritories =
        countries[
            playerCountry
        ].territories;


    if (
        playerTerritories >=
        totalTerritories
    ) {

        gameWon = true;


        pauseGame();


        victoryMessage.textContent =
            playerCountry +
            " has conquered every territory " +
            "on the map and united the entire world!";


        victoryTerritories.textContent =
            playerTerritories;


        victoryYear.textContent =
            year;


        victoryScreen.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   ATTACK
========================================================= */

attackButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {

            alert(
                "Select an enemy country first!"
            );

            return;
        }


        const target =
            selectedTerritory.dataset.country;


        if (target === playerCountry) {

            alert(
                "You cannot attack yourself!"
            );

            return;
        }


        const status =
            diplomaticStatuses[
                playerCountry
            ][target];


        if (status !== "WAR") {

            alert(
                "You must declare war on " +
                target +
                " first!"
            );

            return;
        }


        const attacker =
            countries[playerCountry];


        const defender =
            countries[target];


        /*
           Battle power
        */

        const attackerPower =
            attacker.military *
            (
                1 +
                attacker.technology *
                0.08
            );


        const defenderPower =
            defender.military *
            (
                1 +
                defender.technology *
                0.08
            );


        const attackerRoll =
            attackerPower *
            (
                0.75 +
                Math.random() * 0.5
            );


        const defenderRoll =
            defenderPower *
            (
                0.75 +
                Math.random() * 0.5
            );


        let report = "";


        /* =============================================
           VICTORY
        ============================================= */

        if (
            attackerRoll >
            defenderRoll
        ) {

            const enemyLosses =
                Math.floor(
                    defender.military *
                    (
                        0.15 +
                        Math.random() * 0.15
                    )
                );


            const yourLosses =
                Math.floor(
                    attacker.military *
                    (
                        0.05 +
                        Math.random() * 0.10
                    )
                );


            attacker.military =
                Math.max(
                    1,
                    attacker.military -
                    yourLosses
                );


            defender.military =
                Math.max(
                    0,
                    defender.military -
                    enemyLosses
                );


            /*
               CAPTURE THE TERRITORY
            */

            conquerTerritory(
                selectedTerritory,
                playerCountry,
                target
            );


            report =
                "🏆 VICTORY!\n\n" +

                playerCountry +
                " defeated " +
                target +
                "!\n\n" +

                "🪖 Your losses: " +
                yourLosses +
                "\n" +

                "🪖 Enemy losses: " +
                enemyLosses +
                "\n\n" +

                "🗺️ TERRITORY CAPTURED!\n\n" +

                playerCountry +
                " now controls this territory.";

        }


        /* =============================================
           DEFEAT
        ============================================= */

        else {

            const yourLosses =
                Math.floor(
                    attacker.military *
                    (
                        0.15 +
                        Math.random() * 0.20
                    )
                );


            const enemyLosses =
                Math.floor(
                    defender.military *
                    (
                        0.05 +
                        Math.random() * 0.10
                    )
                );


            attacker.military =
                Math.max(
                    1,
                    attacker.military -
                    yourLosses
                );


            defender.military =
                Math.max(
                    1,
                    defender.military -
                    enemyLosses
                );


            report =
                "❌ DEFEAT!\n\n" +

                target +
                " successfully defended its territory!\n\n" +

                "🪖 Your losses: " +
                yourLosses +
                "\n" +

                "🪖 Enemy losses: " +
                enemyLosses;

        }


        updatePlayerDisplay();

        updateCountryPanel();


        /*
           Show battle report.
        */

        warReport.textContent =
            report;


        warNotification.classList.remove(
            "hidden"
        );

    }
);


/* =========================================================
   CLOSE WAR REPORT
========================================================= */

closeWarReport.addEventListener(
    "click",
    function() {

        warNotification.classList.add(
            "hidden"
        );

    }
);


/* =========================================================
   AI DIPLOMACY
========================================================= */

function runAIDiplomacy() {

    const names =
        Object.keys(countries);


    names.forEach(function(countryA) {

        if (
            countryA === playerCountry
        ) {

            return;
        }


        names.forEach(function(countryB) {

            if (
                countryA === countryB
            ) {

                return;
            }


            if (
                diplomaticStatuses[
                    countryA
                ][countryB] === "WAR"
            ) {

                return;
            }


            const personality =
                countries[
                    countryA
                ].personality;


            let change = 0;


            if (
                personality === "Trader"
            ) {

                change =
                    Math.floor(
                        Math.random() * 5
                    ) - 1;

            }

            else if (
                personality === "Peaceful"
            ) {

                change =
                    Math.floor(
                        Math.random() * 5
                    );

            }

            else if (
                personality === "Expansionist"
            ) {

                change =
                    Math.floor(
                        Math.random() * 5
                    ) - 2;

            }


            relations[
                countryA
            ][countryB] += change;


            relations[
                countryA
            ][countryB] =
                Math.max(
                    -100,
                    Math.min(
                        100,
                        relations[
                            countryA
                        ][countryB]
                    )
                );

        });

    });

}


/* =========================================================
   AI DECISIONS
========================================================= */

function runAIDecisions() {

    for (
        const countryName in countries
    ) {

        if (
            countryName === playerCountry
        ) {

            continue;
        }


        const country =
            countries[countryName];


        /*
           Income
        */

        country.money +=
            Math.floor(
                country.economy * 2
            );


        /*
           Population growth
        */

        country.population =
            Math.floor(
                country.population * 1.005
            );


        const decision =
            Math.random();


        /*
           Recruit
        */

        if (
            decision < 0.30 &&
            country.money >= 100
        ) {

            country.money -= 100;

            country.military +=
                Math.floor(
                    Math.random() * 6
                ) + 2;

        }


        /*
           Research
        */

        else if (
            decision < 0.50 &&
            country.money >= 150
        ) {

            country.money -= 150;

            country.technology++;

        }


        /*
           Economy
        */

        else if (
            decision < 0.75 &&
            country.money >= 100
        ) {

            country.money -= 100;

            country.economy++;

        }

    }

}


/* =========================================================
   ADVANCE YEAR
========================================================= */

function advanceYear() {

    if (
        gameWon ||
        !playerCountry
    ) {

        return;
    }


    year++;


    const player =
        countries[playerCountry];


    /*
       Income
    */

    player.money +=
        Math.floor(
            player.economy * 2
        );


    /*
       Population
    */

    player.population =
        Math.floor(
            player.population * 1.01
        );


    /*
       Small chance of technology increase.
    */

    if (
        Math.random() < 0.15
    ) {

        player.technology++;

    }


    /*
       AI
    */

    runAIDecisions();

    runAIDiplomacy();


    updatePlayerDisplay();

    updateCountryPanel();

}


/* =========================================================
   PLAY
========================================================= */

function playGame() {

    if (
        gameRunning ||
        gameWon
    ) {

        return;
    }


    gameRunning = true;


    gameStatus.textContent =
        "▶️ Game Running";


    gameTimer =
        setInterval(
            advanceYear,
            gameSpeed
        );

}


/* =========================================================
   PAUSE
========================================================= */

function pauseGame() {

    gameRunning = false;


    clearInterval(
        gameTimer
    );


    gameTimer = null;


    gameStatus.textContent =
        "⏸️ Game Paused";

}


/* =========================================================
   SPEED
========================================================= */

function changeSpeed(speed) {

    gameSpeed = speed;


    if (gameRunning) {

        clearInterval(
            gameTimer
        );


        gameTimer =
            setInterval(
                advanceYear,
                gameSpeed
            );

    }

}


/* =========================================================
   TIME BUTTONS
========================================================= */

playButton.addEventListener(
    "click",
    playGame
);


pauseButton.addEventListener(
    "click",
    pauseGame
);


speed1Button.addEventListener(
    "click",
    function() {

        changeSpeed(1000);

    }
);


speed2Button.addEventListener(
    "click",
    function() {

        changeSpeed(500);

    }
);


speed5Button.addEventListener(
    "click",
    function() {

        changeSpeed(200);

    }
);


/* =========================================================
   BUILD
========================================================= */

buildButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {

            alert(
                "Select one of your territories first."
            );

            return;
        }


        if (
            selectedTerritory.dataset.country
            !== playerCountry
        ) {

            alert(
                "You can only build in your own territory!"
            );

            return;
        }


        const player =
            countries[playerCountry];


        if (
            player.money < 100
        ) {

            alert(
                "You don't have enough money!"
            );

            return;
        }


        player.money -= 100;

        player.economy += 2;


        updatePlayerDisplay();

        updateCountryPanel();


        alert(
            "🏗️ Building constructed!\n\n" +
            "Economy +2"
        );

    }
);


/* =========================================================
   RECRUIT
========================================================= */

recruitButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {

            alert(
                "Select one of your territories first."
            );

            return;
        }


        if (
            selectedTerritory.dataset.country
            !== playerCountry
        ) {

            alert(
                "You can only recruit in your own territory!"
            );

            return;
        }


        const player =
            countries[playerCountry];


        if (
            player.money < 150
        ) {

            alert(
                "You don't have enough money!"
            );

            return;
        }


        player.money -= 150;

        player.military += 10;


        updatePlayerDisplay();

        updateCountryPanel();


        alert(
            "🪖 10 military strength recruited!"
        );

    }
);


/* =========================================================
   RESEARCH
========================================================= */

researchButton.addEventListener(
    "click",
    function() {

        if (!selectedTerritory) {

            alert(
                "Select one of your territories first."
            );

            return;
        }


        if (
            selectedTerritory.dataset.country
            !== playerCountry
        ) {

            alert(
                "You can only research in your own territory!"
            );

            return;
        }


        const player =
            countries[playerCountry];


        if (
            player.money < 200
        ) {

            alert(
                "You don't have enough money!"
            );

            return;
        }


        player.money -= 200;

        player.technology++;


        updatePlayerDisplay();

        updateCountryPanel();


        alert(
            "🔬 Technology advanced!\n\n" +
            "Technology +1"
        );

    }
);


/* =========================================================
   RESTART GAME
========================================================= */

function restartGame() {

    /*
       Stop the clock.
    */

    pauseGame();


    /*
       Reset country data.
    */

    countries.Northland = {
        population: 82000,
        money: 700,
        military: 40,
        technology: 2,
        economy: 65,
        government: "Monarchy",
        personality: "Expansionist",
        territories: 1
    };


    countries.Eastland = {
        population: 115000,
        money: 1200,
        military: 55,
        technology: 3,
        economy: 82,
        government: "Republic",
        personality: "Trader",
        territories: 1
    };


    countries.Southland = {
        population: 97000,
        money: 900,
        military: 48,
        technology: 2,
        economy: 71,
        government: "Kingdom",
        personality: "Defensive",
        territories: 1
    };


    countries.Westland = {
        population: 63000,
        money: 500,
        military: 31,
        technology: 1,
        economy: 54,
        government: "Republic",
        personality: "Peaceful",
        territories: 1
    };


    countries.Centralia = {
        population: 143000,
        money: 1600,
        military: 72,
        technology: 4,
        economy: 91,
        government: "Empire",
        personality: "Aggressive",
        territories: 1
    };


    countries.Highlands = {
        population: 42000,
        money: 400,
        military: 27,
        technology: 1,
        economy: 43,
        government: "Tribal",
        personality: "Isolationist",
        territories: 1
    };


    /*
       Reset diplomacy.
    */

    initializeDiplomacy();


    /*
       Reset game variables.
    */

    playerCountry = null;

    year = 1427;

    gameRunning = false;

    gameSpeed = 1000;

    selectedTerritory = null;

    gameWon = false;


    /*
       Reset every territory.
    */

    territories.forEach(
        function(territory) {

            const originalCountry =
                territory.dataset.originalCountry;


            if (
                originalCountry
            ) {

                territory.dataset.country =
                    originalCountry;

            }

        }
    );


    /*
       The original countries are determined
       by the territory's CSS class.
    */

    territories.forEach(
        function(territory) {

            let originalCountry;


            if (
                territory.classList.contains(
                    "northland"
                )
            ) {

                originalCountry =
                    "Northland";

            }

            else if (
                territory.classList.contains(
                    "eastland"
                )
            ) {

                originalCountry =
                    "Eastland";

            }

            else if (
                territory.classList.contains(
                    "southland"
                )
            ) {

                originalCountry =
                    "Southland";

            }

            else if (
                territory.classList.contains(
                    "westland"
                )
            ) {

                originalCountry =
                    "Westland";

            }

            else if (
                territory.classList.contains(
                    "centralia"
                )
            ) {

                originalCountry =
                    "Centralia";

            }

            else if (
                territory.classList.contains(
                    "highlands"
                )
            ) {

                originalCountry =
                    "Highlands";

            }


            territory.dataset.country =
                originalCountry;


            territory.style.backgroundColor =
                countryColors[
                    originalCountry
                ];


            territory.style.display =
                "flex";


            territory.classList.remove(
                "selected"
            );


            territory.textContent =
                originalCountry;

        }
    );


    /*
       Hide victory screen.
    */

    victoryScreen.classList.add(
        "hidden"
    );


    /*
       Hide war report.
    */

    warNotification.classList.add(
        "hidden"
    );


    /*
       Return to nation selection.
    */

    gameScreen.classList.add(
        "hidden"
    );


    nationScreen.classList.remove(
        "hidden"
    );


    /*
       Reset country information panel.
    */

    noSelection.classList.remove(
        "hidden"
    );


    countryInfo.classList.add(
        "hidden"
    );


    gameStatus.textContent =
        "⏸️ Game Paused";


    console.log(
        "Game restarted."
    );

}


/* =========================================================
   RESTART BUTTONS
========================================================= */

restartButton.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "🔄 RESTART GAME?\n\n" +
                "All progress will be lost."
            );


        if (confirmed) {

            restartGame();

        }

    }
);


victoryRestart.addEventListener(
    "click",
    function() {

        restartGame();

    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

territories.forEach(
    function(territory) {

        territory.dataset.originalCountry =
            territory.dataset.country;

    }
);


console.log(
    "🌍 Grand Strategy Prototype loaded!"
);

console.log(
    "Choose your nation and conquer the world!"
);
