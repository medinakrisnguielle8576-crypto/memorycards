document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');

    const icons = ["🍎","🍌", "🍇", "🍒", "🍍", "🥑", "🍓", "🍉"];
    let cards = [...icons, ...icons];

    //shuffle the cards
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    //render the board
    function createBoard() {
        gameBoard.innerHTML = '';// clears previous game

        shuffle(cards).forEach(icon => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.textContent = icon;
            card.dataset.icon = icon;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        })
    }

    //flip logic and board locking
    let flippedCards = [];
    let lockBoard = false; // prevents clicks while comparing

    function flipCard() {
        if (lockBoard || this.classList.contains('flipped')) return;

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }

    //matching logic and score
    let attempts = 0;

    const scoreDisplay = document.createElement('p');
    document.body.insertBefore(scoreDisplay, gameBoard);

    function updateScore() {
        scoreDisplay.textContent = `Attempts: ${attempts}`
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        attempts++;
        updateScore();

        if (card1.dataset.icon === card2.dataset.icon) {
            flippedCards = [];
            checkWin();
        } else {
            lockBoard = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000)
        }
    }

    //restart functionality
    restartBtn.addEventListener('click', () => {
        attempts = 0;
        updateScore();
        flippedCards = [];
        lockBoard = false;
        cards = [...icons, ...icons];
        createBoard();
    });

    function checkWin() {
        const allFlipped = [...document.querySelectorAll('.card')]
            .every(card => card.classList.contains('flipped'))

        if (allFlipped) {
            setTimeout(() => alert(`You Won in ${attempts} attempts`), 300);
        }
    }

    updateScore();
    createBoard();
});