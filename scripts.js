//função para execitar uma ação quando clica em uma célula
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]"); //acessa o selector do javascript, para alterar entre x e circulo
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");


let isCircleTurn;

//combinações para vitória
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// começo do jogo
const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true }); // once: true, faz com que o handleClick seja executado apenas uma vez quando clica na célula  
    }

    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message"); //esconde a mensagem de vitória quando apertar o botão de reiniciar
};

//função para mostrar a mensagem de ganhador

const endGame = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "Círculo Venceu!" : "X Venceu"; 
    }

    winningMessage.classList.add("show-winning-message");
};

//função para reiniciar o jogo





//função que verifica a vitória
const checkforWin = (currentPlayer) => { // currentPlayer, simbolo atual
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer); //verifica cada celula da combinação e retorna true se todas possuem o mesmo simbolo. 
        });
    });
};

//função que verifica o empate

const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};



//clique na célula
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

//função que mostra o hover dos simbolos

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
}

//troca a vez, x ou círculo
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};


const handleClick = (e) => {
    //colocar X ou o Círculo quando clica na célula
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    //verificação por vitória
    const isWin = checkforWin(classToAdd);
    
    // verifica por empate
    const isDraw = checkForDraw();

    if(isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        //alterar entre x e circulo
        swapTurns();
    }

};

startGame();

restartButton.addEventListener("click", startGame);


