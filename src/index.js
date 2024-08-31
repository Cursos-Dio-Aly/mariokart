const playerOne = {
    name: 'Mario',
    speed: 4,
    maneuverability: 3,
    power: 3,
    points: 0,
};

const playerTwo = {
    name: 'Luigi',
    speed: 3,
    maneuverability: 4,
    power: 4,
    points: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = 'RETA';
            break;
        case random < 0.66:
            result = 'CURVA';
            break;
        default:
            result = 'CONFRONTO';
            break;
    }

    return result;
}

async function playRaceEngine(characterOne, characterTwo) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada - ${round}`);

        // sort block
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // roll dice
        let diceResultOne = await rollDice();
        let diceResultTwo = await rollDice();

        // test of hability
        let totalTestSkillOne = 0;
        let totalTestSkillTwo = 0;

        if (block === 'RETA') {
            totalTestSkillOne = diceResultOne + characterOne.speed;
            totalTestSkillTwo = diceResultTwo + characterTwo.speed;

            await logRowResult(characterOne.name, 'velocidade', diceResultOne, characterOne.speed);
            await logRowResult(characterTwo.name, 'velocidade', diceResultTwo, characterTwo.speed);
        };

        if (block === 'CURVA') {
            totalTestSkillOne = diceResultOne + characterOne.maneuverability;
            totalTestSkillTwo = diceResultTwo + characterTwo.maneuverability;

            await logRowResult(characterOne.name, 'manobrabilidade', diceResultOne, characterOne.maneuverability);
            await logRowResult(characterTwo.name, 'manobrabilidade', diceResultTwo, characterTwo.maneuverability);
        };

        if (block === 'CONFRONTO') {
            let powerResultOne = diceResultOne + characterOne.power;
            let powerResultTwo = diceResultTwo + characterTwo.power;

            console.log(`${characterOne.name} confrontou com ${characterTwo.name}!🥊`);

            await logRowResult(characterOne.name, 'poder', diceResultOne, characterOne.power);
            await logRowResult(characterTwo.name, 'poder', diceResultTwo, characterTwo.power);

            if (powerResultOne > powerResultTwo && characterTwo.points > 0) {
                console.log(`${characterOne.name} venceu o confronto! ${characterTwo.name} perdeu 1 ponto 🐢.`);
                characterTwo.points--;
            }

            if (powerResultTwo > powerResultOne && characterOne.points > 0) {
                console.log(`${characterTwo.name} venceu o confronto! ${characterOne.name} perdeu 1 ponto 🐢.`);
                characterOne.points--;
            }

            console.log(powerResultTwo === powerResultOne ? 'Confronto empatado! Nenhum ponto foi perdido.' : '');
        };

        if (totalTestSkillOne > totalTestSkillTwo) {
            console.log(`${characterOne.name} marcou um ponto!`);
            characterOne.points++;
        } else if (totalTestSkillTwo > totalTestSkillOne) {
            console.log(`${characterTwo.name} marcou um ponto!`);
            characterTwo.points++;
        }

        console.log('---------------------------------------------------------------');
    };
};

async function logRowResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function declareWinner(characterOne, characterTwo) {
    console.log('Resultado final:');
    console.log(`${characterOne.name}: ${characterOne.points} ponto(s).`);
    console.log(`${characterTwo.name}: ${characterTwo.points} ponto(s).`);

    if (characterOne.points > characterTwo.points) {
        console.log(`${characterOne.name} venceu a corrida! Parabéns 🏆`);
    } else if (characterTwo.points > characterOne.points) {
        console.log(`${characterTwo.name} venceu a corrida! Parabéns 🏆`);
    } else {
        console.log('A corrida terminou em empate.');
    }
}

(async function main() {
    console.log(`🏁 Corrida entre ${playerOne.name} e ${playerTwo.name} começando. \n`);

    await playRaceEngine(playerOne, playerTwo);
    await declareWinner(playerOne, playerTwo);
})();