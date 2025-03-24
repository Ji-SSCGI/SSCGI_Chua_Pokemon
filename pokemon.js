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

        let damageColor = this.getDamageColor(advantage);
        let defenderStatus = defender.hp <= 0 ? "fainted" : `${defender.hp.toFixed()} HP left`;

        console.log(`${this.colorizeText(this.name)} uses ${move.name} and deals ${this.colorizeText(damage.toFixed(), damageColor)} damage to ${this.colorizeText(defender.name, defender.type)}.`);
        console.log(`${this.colorizeText(defender.name, defender.type)} ${defenderStatus}`);

        return defender.hp <= 0;
    }

    // Get color for damage based on effectiveness
    getDamageColor(advantage) {
        if (advantage === 2) return 'red';  // Super Effective
        if (advantage === 0.5) return 'blue';  // Not Effective
        return 'white';  // Normal
    }

    // Colorize text based on Pokémon type or damage
    colorizeText(text, typeOrColor = this.type) {
        let colorCode = this.getColorCode(typeOrColor);
        return `${colorCode}${text}\x1b[0m`;  // Reset color after text
    }

    // Determine the color code based on Pokémon type or specific color
    getColorCode(typeOrColor) {
        switch (typeOrColor) {
            case 'Fire': return '\x1b[31m';  // Red
            case 'Water': return '\x1b[34m';  // Blue
            case 'Electric': return '\x1b[33m';  // Yellow
            case 'Grass': return '\x1b[32m';  // Green
            case 'Rock': return '\x1b[37m';  // Gray
            case 'Bug': return '\x1b[35m';  // Purple
            case 'Normal': return '\x1b[90m';  // Gray
            case 'Ground': return '\x1b[33m';  // Yellow
            case 'red': return '\x1b[31m';  // Red (for damage)
            case 'blue': return '\x1b[34m';  // Blue (for damage)
            case 'green': return '\x1b[32m';  // Green (for normal)
            case 'white': return '\x1b[37m';  // Default white color
            default: return '\x1b[37m';  // Default to white
        }
    }
}

class Trainer {
    constructor(name, pokemons, score) {
        this.name = name;
        this.pokemons = pokemons.map(pokemon => Object.assign(Object.create(Object.getPrototypeOf(pokemon)), pokemon));
        this.currentPokemonIndex = 0;
        this.score = 0;
    }

    getCurrentPokemon() {
        return this.pokemons[this.currentPokemonIndex];
    }

    switchToNextPokemon() {
        for (let i = 0; i < this.pokemons.length; i++) {
            if (this.pokemons[i].hp > 0) {
                this.currentPokemonIndex = i;
                console.log(`${this.name} sends out ${this.colorizeText(this.pokemons[i].name, this.pokemons[i].type)}!!`);
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
        // Ensure the score is correctly incremented
        if (typeof this.score === 'number') {
            this.score += 1;
        } else {
            console.error(`Invalid score value for ${this.name}`);
        }
    }

    colorizeText(text, type) {
        let colorCode = this.getColorCode(type);
        return `${colorCode}${text}\x1b[0m`;
    }

    getColorCode(type) {
        switch (type) {
            case 'Fire': return '\x1b[31m';  // Red
            case 'Water': return '\x1b[34m';  // Blue
            case 'Electric': return '\x1b[33m';  // Yellow
            case 'Grass': return '\x1b[32m';  // Green
            case 'Rock': return '\x1b[37m';  // Gray
            case 'Bug': return '\x1b[35m';  // Purple
            case 'Normal': return '\x1b[90m';  // Gray
            default: return '\x1b[37m';  // Default to white
        }
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
    console.log(`${attacker.colorizeText('Battle starts!')} ${attacker.name} 🆚 ${defender.name}`);

    while (attacker.hp > 0 && defender.hp > 0) {
        let move = attacker.moves[Math.floor(Math.random() * attacker.moves.length)];
        let defenderFainted = attacker.useMove(move, defender);
        if (defenderFainted) {
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
        console.log(`\n Trainer ${trainer1.name} wins the battle!`);
    } else if (trainer2.hasPokemonsLeft()) {
        trainer2.addWin();
        console.log(`\n Trainer ${trainer2.name} wins the battle!`);
    } else {
        console.log("\n The battle ends in a draw!");
    }
}

//  Randomly select two trainers for the battle
let firstTrainer = trainers[Math.floor(Math.random() * trainers.length)];
let secondTrainer;
do {
    secondTrainer = trainers[Math.floor(Math.random() * trainers.length)];
} while (secondTrainer === firstTrainer);