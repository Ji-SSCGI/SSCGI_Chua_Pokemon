class Pokemon {
    constructor(name, type, hp, attack, defense, moves, fullhp) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.fullhp = hp
        this.attack = attack;
        this.defense = defense;
        this.moves = moves;
        this.cooldown = [0, 2, 3];
    }

    useMove(move, defender) {
        let advantage = typeAdvantage(this.type, defender.type);
        let damage = (move.power + this.attack - defender.defense) * advantage;
        damage = damage < 0 ? 0 : damage;
        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;
        console.log(`${this.name} uses ${move.name} and deals ${damage.toFixed()} damage to ${defender.name}.
        ${defender.name} has ${defender.hp.toFixed()} HP left.`);
        return defender.hp <= 0;
    }
}

class Trainer {
    constructor(name, pokemons, score) {
        this.name = name;
        this.pokemons = pokemons.map(pokemon => Object.assign(Object.create(Object.getPrototypeOf(pokemon)), pokemon));
        this.currentPokemonIndex = 0;
        this.score = score;
    }

    getCurrentPokemon() {
        return this.pokemons[this.currentPokemonIndex];
    }

    switchToNextPokemon() {
        for (let i = 0; i < this.pokemons.length; i++) {
            if (this.pokemons[i].hp > 0) {
                this.currentPokemonIndex = i;
                console.log(`${this.name} sends out ${this.pokemons[i].name}!!`);
                return;
            }
        }
    }

    hasPokemonsLeft() {
        return this.pokemons.some(pokemon => pokemon.hp > 0);
    }

    resetPokemons() {
        this.pokemons.forEach(pokemon => {
            pokemon.hp = pokemon.fullhp;
        });
        this.currentPokemonIndex = 0;
    }

    addWin() {
        this.score += 1;
    }
}

// Ash's Pokémon
const pikachu = new Pokemon("Pikachu", "Electric", 180, 55, 40, [
    { name: "Iron Tail", power: 40 },
    { name: "Thunder Shock", power: 65 },
    { name: "Thunderbolt", power: 75 }
]);
const charizard = new Pokemon("Charizard", "Fire", 200, 60, 50, [
    { name: "Dragon Claw", power: 55 },
    { name: "Fire Spin", power: 70 },
    { name: "Flamethrower", power: 80 }
]);
const bulbasaur = new Pokemon("Bulbasaur", "Grass", 200, 50, 50, [
    { name: "Vine Whip", power: 50 },
    { name: "Razor Leaf", power: 65 },
    { name: "Solar Beam", power: 75 }
]);

// Misty's Pokémon
const starmie = new Pokemon("Starmie", "Water", 190, 55, 45, [
    { name: "Water Gun", power: 45 },
    { name: "Bubble Blast", power: 60 },
    { name: "Hydro Pump", power: 85 }
]);
const psyduck = new Pokemon("Psyduck", "Water", 180, 50, 40, [
    { name: "Water Pulse", power: 50 },
    { name: "Bubble Beam", power: 65 },
    { name: "Water Pulse", power: 70 }
]);
const goldeen = new Pokemon("Goldeen", "Water", 170, 45, 40, [
    { name: "Bite", power: 55 },
    { name: "Horn Attack", power: 55 },
    { name: "Aqua Tail", power: 65 }
]);

// Brock's Pokémon
const onix = new Pokemon("Onix", "Rock", 210, 45, 60, [
    { name: "Tail Slap", power: 40 },
    { name: "Rock Throw", power: 55 },
    { name: "Earthquake", power: 75 }
]);
const geodude = new Pokemon("Geodude", "Rock", 190, 50, 55, [
    { name: "Tackle", power: 50 },
    { name: "Rollout", power: 60 },
    { name: "Rock Slide", power: 70 },
]);
const kabuto = new Pokemon("Kabuto", "Rock", 180, 55, 50, [
    { name: "Scratch", power: 50 },
    { name: "Slash", power: 60 },
    { name: "Ancient Power", power: 70 }
]);

// Gary's Pokémon
const eevee = new Pokemon("Eevee", "Normal", 200, 50, 50, [
    { name: "Tackle", power: 45 },
    { name: "Quick Attack", power: 50 },
    { name: "Bite", power: 55 }
]);
const arcanine = new Pokemon("Arcanine", "Fire", 200, 60, 50, [
    { name: "Flame Wheel", power: 55 },
    { name: "Fire Fang", power: 60 },
    { name: "Extreme Speed", power: 70 }
]);
const blastoise = new Pokemon("Blastoise", "Water", 200, 55, 55, [
    { name: "Water Gun", power: 50 },
    { name: "Hydro Pump", power: 65 },
    { name: "Bite", power: 70 }
]);

// Tracey's Pokémon 
const scyther = new Pokemon("Scyther", "Bug", 200, 55, 45, [
    { name: "Slash", power: 50 },
    { name: "Quick Attack", power: 55 },
    { name: "Fury Cutter", power: 60 }
]);
const venonat = new Pokemon("Venonat", "Bug", 200, 45, 50, [
    { name: "Poison Powder", power: 40 },
    { name: "Psychic", power: 60 },
    { name: "Stun Spore", power: 80 }
]);
const marill = new Pokemon("Marill", "Water", 200, 50, 50, [
    { name: "Water Gun", power: 45 },
    { name: "Bubble Beam", power: 55 },
    { name: "Play Rough", power: 60 }]
);

//  TrainerList Setup
const trainers = [
    new Trainer("Ash", [pikachu, charizard, bulbasaur]),
    new Trainer("Misty", [starmie, psyduck, goldeen]),
    new Trainer("Brock", [onix, geodude, kabuto]),
    new Trainer("Garry", [eevee, arcanine, blastoise]),
    new Trainer("Tracey", [scyther, venonat, marill])
];

function typeAdvantage(attackerType, defenderType) {
    switch (attackerType) {
        case "Fire":
            return defenderType === "Grass" ? 2 : defenderType === "Water" ? 0.5 : 1;
        case "Grass":
            return defenderType === "Water" ? 2 : defenderType === "Fire" ? 0.5 : 1;
        case "Water":
            return defenderType === "Fire" ? 2 : defenderType === "Grass" ? 0.5 : 1;
        case "Electric":
            return defenderType === "Water" ? 2 : defenderType === "Ground" ? 0 : 1;
        case "Rock":
            return defenderType === "Fire" ? 2 : defenderType === "Water" ? 0.5 : 1;
        case "Bug":
            return defenderType === "Grass" ? 2 : 1;
        case "Ground":
            return defenderType === "Electric" ? 2 : defenderType === "Water" ? 0.5 : 1;
        default:
            return 1;
    }
}

function battle(attacker, defender) {
    console.log("");
    console.log(`Battle starts! ${attacker.name} vs ${defender.name} `);

    while (attacker.hp > 0 && defender.hp > 0) {
        let move = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
        let defenderFainted = attacker.useMove(move, defender);
        if (defenderFainted) {
            console.log(`${defender.name} has fainted! °⭒˚`);
            break;
        }

        // Swap roles (turn-based)
        [attacker, defender] = [defender, attacker];
    }
}

function simulateBattle(trainer1, trainer2) {
    console.log(`
            Trainer ${trainer1.name} 🆚 Trainer ${trainer2.name} `);

    // Reset Pokémon before each battle
    trainer1.resetPokemons();
    trainer2.resetPokemons();

    // Send out initial Pokémon
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
        trainer1.addWin();
        console.log(`\n🏆 Trainer ${trainer1.name} wins the battle!`);
    } else if (trainer2.hasPokemonsLeft()) {
        trainer2.addWin();
        console.log(`\n🏆 Trainer ${trainer2.name} wins the battle!`);
    } else {
        console.log("\n🤝 The battle ends in a draw!");
    }
}

// Simulate Tournament
function simulateTournament(trainers) {
    let trainerCount = prompt("Welcome to the Pokémon Tournament! Press enter number of trainers to start the tournament.");
    getRandomTrainer(trainers, trainerCount);
    if (trainerCount < 3) {
        console.log("Tournament requires at least 2 trainers.");
        return;
    }
    else if (trainerCount == 3) {
        for (let i = 0; i < trainerCount - 1; i++) {
            for (let j = i + 1; j < trainerCount; j++) {
                simulateBattle(trainers[i], trainers[j]);
            }
        }
    }
    else if (trainerCount == trainers.length) {
        for (let i = 0; i < trainers.length - 1; i++) {
            for (let j = i + 1; j < trainers.length; j++) {
                simulateBattle(trainers[i], trainers[j]);
            }
        }
    }
    else {
        console.log("Invalid number of trainers.");
    }
}

// Generate Random Trainer List
function getRandomTrainer(trainers, trainerCount) {
    if (trainers.length < trainerCount) {
        throw new Error("Not enough trainer on the list.");
    }

    // Shuffle the array
    const shuffled = trainers.sort(() => Math.random() - 0.5);

    // Get the first `count` elements
    return shuffled.slice(0, trainerCount);
}

//  Randomly select two trainers for the battle
let firstTrainer = trainers[Math.floor(Math.random() * trainers.length)];
let secondTrainer;
do {
    secondTrainer = trainers[Math.floor(Math.random() * trainers.length)];
} while (secondTrainer === firstTrainer);

// Randomly select number of trainer from the list based on user's input
// Generate Random Trainer List
function getRandomTrainer(trainers, trainerCount) {
    if (trainers.length < trainerCount) {
        throw new Error('Not enough elements in the array');
    }

    // Shuffle the array
    const shuffled = trainers.sort(() => Math.random() - 0.5);

    // Get the first `count` elements
    return shuffled.slice(0, trainerCount);
}

while (true) {
    simulateTournament(trainers);
};
