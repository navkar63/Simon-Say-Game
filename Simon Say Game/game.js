let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// Start the game on keypress
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

// Flash a button
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250); // Reduced timeout for better UX
}

// Handle leveling up
function levelUp() {
    userSeq = []; // Reset user sequence
    level++;
    h2.innerText = `Level ${level}`;

    // Choose a random color and add it to the game sequence
    let randIdx = Math.floor(Math.random() * 4); // Fixed random index calculation
    let randomColor = btns[randIdx];
    gameSeq.push(randomColor); // Add to game sequence
    console.log(gameSeq);

    // Flash the button
    let randBtn = document.querySelector(`.${randomColor}`);
    btnFlash(randBtn);
}

// Handle button clicks
function btnPress() {
    let btn = this;
    btnFlash(btn);

    // Get the color of the pressed button
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor); // Add to user sequence

    // Check if the user's sequence matches the game's sequence
    checkSeq(userSeq.length - 1);
}

// Check if the user's sequence matches the game's sequence
function checkSeq(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Proceed to the next level
        }
    } else {
        // Game over
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart.`;
        document.body.classList.add("game-over");
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);
        resetGame();
    }
}

// Reset the game
function resetGame() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Add event listeners to all buttons
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}