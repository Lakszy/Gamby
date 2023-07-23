const prompt = require("prompt-sync")();


const COLS = 3;
const ROWS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
}


const deposit = () => {
    while (true) {

        const depoAmount = prompt("Enter the amount you want to deposit: ");
        const dpAmount = parseFloat(depoAmount);
        if (isNaN(dpAmount) || dpAmount <= 0)
            prompt("Please enter a valid amount !!");

        else
            return dpAmount;
    }
};




const getNoOfLines = () => {
    while (true) {

        const lines = prompt("Enter the lines you want to bet on(1-3): ");
        const getLines = parseFloat(lines);
        if (isNaN(getLines) || getLines > 3 || getLines <= 0) {
            prompt("Please enter a valid number !!");
        }

        else {
            return getLines;
        }
    }
};


const getBet = (balance, lines) => {
    while (true) {

        const bet = prompt("Enter The bet per line ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) 
         prompt("Invalid bet, try again!");
        
        else 
        return numberBet;
        
    }
};

const spin = () => {
    // we are creating a empty array symbols for storing the symbols
    const symbols = [];

    // symbol->count
    //      A->2

    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelsSymbols = [...symbols];

        // now we will be selecting any random index within our given array
        for (let j = 0; j < ROWS; j++) {

            const randomIndex = Math.floor(Math.random() * reelsSymbols.length);

            // giving the random index to the stored reelsSymbols
            const selectedSymbols = reelsSymbols[randomIndex];

            reels[i].push(selectedSymbols);



            // The splice method is a built-in JavaScript
            // it is removing elements from reelsSymbols
            // and 1 is the number of elemts to be removed,
            // starting from random index.

            // removing so that we will not slect the one again
            reelsSymbols.splice(randomIndex, 1);
        }

    }
    return reels;

};


const tranpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {

    for (const row of rows) {
        let rowString = "";

        for (const [i, symbol] of row.entries()) {
            rowString += symbol;

            if (i != row.length - 1) {
                rowString += " | ";

            }
        }
        console.log(rowString);
    }
};

const getWinnigs = (rows, bet, lines) => {

    let win = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;


        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            win += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return win;
};



const game = () => {
    let balanceRem = deposit();


    while (true) {
        console.log("You have a balance of $ " + balanceRem);

        const getLines = getNoOfLines();

        const bet = getBet(balanceRem, getLines);

        balanceRem -= bet * getLines;

        const reels = spin();

        const rows = tranpose(reels);

        printRows(rows);
        const win = getWinnigs(rows, bet, getLines);

        console.log("You won, $ " + win.toString());
        
        balanceRem += win;






        if (balanceRem <= 0) {
            console.log("You ran out of money!");
            break;
        }
       
        const wish =prompt("Do you want to continue? (Y/N)");
        if (wish=="Y" || wish=="y") continue;

        else break;





    }
};

game();
