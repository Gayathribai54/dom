const playerScore =  document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const reset = document.getElementById("reset");
const result = document.getElementById("result");
const playerChoiceDisplay = document.getElementById("player-choice")
const computerChoiceDisplay = document.getElementById("computer-choice");
const emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌"
};
const gameRules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};

const choices = ["rock", "paper", "scissors"];
let countply = 0;
let countcom = 0;

//random computer choice
function getComputerChoice(){
    return choices[Math.floor(Math.random() * choices.length)];
}
//determine winner
function selectWin(player,computer){
    if(player === computer){
        result.className = "result tie";
        result.innerText = "it's a tie!";
    }else if(gameRules[player] === computer){
        result.className = "result win";
        result.innerText = "You Win!";
        countply++;
    }else{
        result.className = "result lose";
        result.innerText = "Computer Wins!";
        countcom++;
    }
    playerScore.textContent = `You: ${countply}`;
    computerScore.textContent = `Computer: ${countcom}`;
}
//player and com choices
document.querySelectorAll(".choice-btn").forEach(btn =>{
    btn.addEventListener("click",function(){
        const player = this.id;
        const computer = getComputerChoice();
        playerChoiceDisplay.textContent = `Your choice: ${emojis[player]} ${player}`;
        computerChoiceDisplay.textContent = `Computer choice: ${emojis[computer]} ${computer}`;
        selectWin(player, computer);
    });
});

//reset game
reset.addEventListener("click",function(){
    countply = 0;
    countcom = 0;
   playerScore.textContent = `You: ${countply}`;
    computerScore.textContent = `Computer: ${countcom}`;
     playerChoiceDisplay.textContent = "Your choice:";
    computerChoiceDisplay.textContent = "Computer choice:";
    result.className = "result";
    result.innerText = "Choose an option to start!";
});