// Select the Start Tournament button and the trainer count dropdown
const startBtn = document.getElementById("start-btn");
const trainerCountSelect = document.getElementById("trainer-count");

// When the button is clicked, start the tournament
startBtn.addEventListener("click", function() {
    const trainerCount = parseInt(trainerCountSelect.value);

    // Ensure valid trainer count
    if (isNaN(trainerCount) || trainerCount < 2 || trainerCount > 5) {
        alert("Please select a valid number of trainers (between 2 and 5).");
        return;
    }

    // Start the tournament with the selected number of trainers
    simulateTournament(trainers, trainerCount);
});

// Function to display trainer cards with scores
function displayTrainerCards(trainers) {
    const trainerCardsContainer = document.getElementById("trainer-cards");
    trainerCardsContainer.innerHTML = ''; // Clear previous results

    trainers.forEach(trainer => {
        const trainerCard = document.createElement("div");
        trainerCard.classList.add("trainer-card");

        trainerCard.innerHTML = `
            <div class="trainer-card-header">${trainer.name}</div>
            <div class="score">Score: ${trainer.score}</div>
        `;

        trainerCardsContainer.appendChild(trainerCard);
    });
}

// Simulate the tournament
function simulateTournament(trainers, trainerCount) {
    // Reset scores for all trainers before the new tournament
    trainers.forEach(trainer => {
    trainer.score = 0;
    });

    let selectedTrainers = getRandomTrainer(trainers, trainerCount);

    // Proceed with tournament battles
    for (let i = 0; i < selectedTrainers.length - 1; i++) {
        for (let j = i + 1; j < selectedTrainers.length; j++) {
            simulateBattle(selectedTrainers[i], selectedTrainers[j]);
        }
    }

    // After the group stage, check for a tie in the number of wins
    let topTrainers = selectedTrainers.filter(trainer => trainer.score === Math.max(...selectedTrainers.map(t => t.score)));

    if (topTrainers.length > 1) {
        console.log("\nIt's a tie between multiple trainers! They will now battle for the ultimate championship!");
        // Conduct a final match between the tied trainers
        let finalBattleWinner = simulateFinalMatch(topTrainers[0], topTrainers[1]);

        // Declare the final match winner as the champion
        declareChampion([finalBattleWinner]);
    } else {
        // No tie, declare the winner directly
        declareChampion(topTrainers);
    }

    // After the tournament, display the trainer cards with their scores
    displayTrainerCards(selectedTrainers);
}

function simulateFinalMatch(trainer1, trainer2) {
    console.log(`\nFinal Showdown: ${trainer1.name} 🆚 ${trainer2.name}`);
    // Reset Pokémon before the final match
    trainer1.resetPokemons();
    trainer2.resetPokemons();

    // Send out initial Pokémon for the final battle
    trainer1.switchToNextPokemon();
    trainer2.switchToNextPokemon();

    while (trainer1.hasPokemonsLeft() && trainer2.hasPokemonsLeft()) {
        let pokemon1 = trainer1.getCurrentPokemon();
        let pokemon2 = trainer2.getCurrentPokemon();

        battle(pokemon1, pokemon2);

        // If one Pokémon faints, switch to next available one
        if (pokemon1.hp <= 0 && trainer1.hasPokemonsLeft()) {
            trainer1.switchToNextPokemon();
        }
        if (pokemon2.hp <= 0 && trainer2.hasPokemonsLeft()) {
            trainer2.switchToNextPokemon();
        }
    }

    if (trainer1.hasPokemonsLeft()) {
        trainer1.addWin();  // Final battle win
        console.log(`\n Trainer ${trainer1.name} wins the tournament! 🎉`);
        return trainer1;  // Trainer 1 wins the final
    } else {
        trainer2.addWin();  // Final battle win
        console.log(`\n Trainer ${trainer2.name} wins the tournament! 🎉`);
        return trainer2;  // Trainer 2 wins the final
    }
}

//  Randomly select trainers for the battle
function getRandomTrainer(trainers, trainerCount) {
    // Shuffle the array
    const shuffled = trainers.sort(() => Math.random() - 0.5);

    // Get the first `count` elements
    return shuffled.slice(0, trainerCount);
}

// Declare the tournament champion
function declareChampion(trainers) {
    // Sort trainers by score (most wins first)
    trainers.sort((a, b) => b.score - a.score);

    const champion = trainers[0];
    console.log(`\n🏆 The tournament champion is ${champion.name} with ${champion.score} wins! 🎉`);
}