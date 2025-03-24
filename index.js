class Pokemon {
    constructor(name, type, hp, attack, defense, move1, move2, move3) {
        this.name = name;
        this.type = type;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.moves = {
            move1: {
                name: move1.name,
                power: move1.power,
                damage() {
                    return this.power;
                }
            },
            move2: {
                name: move2.name,
                power: move2.power,
                damage() {
                    return this.power;
                }
            },
            move3: {
                name: move3.name,
                power: move3.power,
                damage() {
                    return this.power;
                }
            }
        }
    }
}

function typeAdvantage(attackerType, defenderType) {
    switch (attackerType) {
        case "Fire":
            return defenderType === "Grass" ? 2 : 1;
        case "Grass":
            return defenderType === "Water" ? 2 : 1;
        case "Water":
            return defenderType === "Fire" ? 2 : 1;
        default:
            return 1;
    }
}

function battle(attacker, defender, move) {
    let advantage = typeAdvantage(attacker.type, defender.type);
    let damage = (move.damage() - defender.defense) * advantage;
    damage = damage < 0 ? 0 : damage;
    defender.hp -= damage;
    console.log(`${attacker.name} uses ${move.name} and deals ${damage} damage to ${defender.name}.`);
    return defender.hp <= 0;
}

// Define Bulbasaur
let bulbasaur = new Pokemon(
    "Bulbasaur",
    "Grass",
    200,
    50,
    50,
    { name: "Vine Whip", power: 50 + 50 * 0.25 },
    { name: "Razor Leaf", power: 50 + 50 * 0.40 },
    { name: "Solar Beam", power: 50 + 50 * 0.65 }
);

// Define Charmander
let charmander = new Pokemon(
    "Charmander",
    "Fire",
    200,
    55,
    45,
    { name: "Ember", power: 55 + 55 * 0.25 },
    { name: "Flamethrower", power: 55 + 55 * 0.40 },
    { name: "Fire Spin", power: 55 + 55 * 0.65 }
);

// Define Squirtle
let squirtle = new Pokemon(
    "Squirtle",
    "Water",
    200,
    45,
    55,
    { name: "Water Gun", power: 45 + 45 * 0.25 },
    { name: "Bubble Beam", power: 45 + 45 * 0.40 },
    { name: "Hydro Pump", power: 45 + 45 * 0.65 }
);

function selectPokemon() {
    try {
        let first = prompt("Select First Pokemon to Fight [1. Bulbasaur, 2. Charmander, 3. Squirtle]: ");
        switch (first) {
            case "1":
                first = bulbasaur;
                break;
            case "2":
                first = charmander;
                break;
            case "3":
                first = squirtle;
                break;
            default:
                throw new Error("Invalid Input");
        }
        console.log(`Selected First Pokemon: ${first.name}`);

        let second = prompt("Select Second Pokemon to Fight [1. Bulbasaur, 2. Charmander, 3. Squirtle]: ");
        switch (second) {
            case "1":
                second = bulbasaur;
                break;
            case "2":
                second = charmander;
                break;
            case "3":
                second = squirtle;
                break;
            default:
                throw new Error("Invalid Input");
        }
        console.log(`Selected Second Pokemon: ${second.name}`);

        return { first, second };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

function selectAttacker(first, second) {
    try {
        let attacker = prompt(`Select Attacker [1. ${first.name}, 2. ${second.name}]: `);
        let defender;
        switch (attacker) {
            case "1":
                attacker = first;
                defender = second;
                break;
            case "2":
                attacker = second;
                defender = first;
                break;
            default:
                throw new Error("Invalid Input");
        }
        console.log(`Selected Attacker: ${attacker.name}`);
        console.log(`Selected Defender: ${defender.name}`);

        return { attacker, defender };
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

function selectMove(attacker) {
    try {
        let moveChoice = prompt(`Select Move for ${attacker.name} [1. ${attacker.moves.move1.name}, 2. ${attacker.moves.move2.name}, 3. ${attacker.moves.move3.name}]: `);
        switch (moveChoice) {
            case "1":
                return attacker.moves.move1;
            case "2":
                return attacker.moves.move2;
            case "3":
                return attacker.moves.move3;
            default:
                throw new Error("Invalid Input");
        }
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

// Start battle
let game = 'Y';
do {

    let selectedPokemons = selectPokemon();
    if (selectedPokemons) {
        let { first, second } = selectedPokemons;
        let selectedAttacker = selectAttacker(first, second);
        if (selectedAttacker) {
            let { attacker, defender } = selectedAttacker;

            while (attacker.hp > 0 && defender.hp > 0) {
                let move = selectMove(attacker);
                if (move) {
                    let defenderFainted = battle(attacker, defender, move);
                    console.log(defenderFainted ? `${defender.name} has fainted! ${attacker.name} wins!` : `${defender.name} survived with ${defender.hp} HP left.`);

                    // End battle if a Pokémon faints
                    if (defenderFainted) break;

                    // Swap turns
                    [attacker, defender] = [defender, attacker];
                }
            }
        }
    }
} while (game = 'Y');