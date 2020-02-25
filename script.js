const cards = document.querySelectorAll(".memory_card");

var hasflippedCard = false;
var lockBoard = true;
var firstCard,secondCard;
var currentScore = 0;
var matchCounter = 0;

//flip card section
function flipCard(){
    if (lockBoard) return;
    if (this === firstCard) return;
   
        
    this.classList.add("flip");
    currentScore++;
    scoreValue.innerText = currentScore;
   
     
     if (!hasflippedCard) {
        //first click!
        hasflippedCard = true;
        firstCard = this;
    
       
    }
    else {
        //second click, second card
        hasflippedCard = false;
        secondCard = this;
        checkForMatch(); 

    } 
    if (allFlipped()) {
        endGame();
    }  
}

function checkForMatch(){      
    if (firstCard.dataset.name === secondCard.dataset.name) {
        //match - remove flip event,  leaves card face up
        disableCards();  
        matchCounter++;     
    }
    else {
        // no match - remove flip class on both cards (turning them face down again) - and give the player time to remember, via setTimeOut();
        unflipCards(); 
    } 
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click",flipCard);   
    resetBoard();
};

function unflipCards() {
    lockBoard = true;
    setTimeout(function(){
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
        resetBoard();
    },1500);
};

function resetBoard() {
    [hasflippedCard,lockBoard] = [false, false];
    [firstCard,secondCard] = [null, null];
    
};

function shuffle() {
    cards.forEach(function(card){
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    })
};

cards.forEach(function(value){
    value.addEventListener("click", flipCard)
});

//"New Game" button
var newGameButton = document.getElementById("newgamebutton");
var scoreValue = document.getElementById("currentscore");

newGameButton.addEventListener("click",function(event){
    resetBoard();
    shuffle();
    matchCounter = 0;
    currentScore = 0;
    scoreValue.innerText = currentScore;
    cards.forEach(function(value){
        value.classList.remove("flip");
        value.addEventListener("click", flipCard);
    })
    setTimeout(function(){
        alert("Start!");
    },200);
   
})

//append victory class to the memorygame dom, which is a big red box with white text that says "victory"

var victoryScreen = document.createElement("div");
victoryScreen.classList.add("victory");
victoryScreen.innerText = "VICTORY!";
var gameContainer = document.querySelector(".memory_game");
var topScore = document.querySelector(".topscore")

//checks to see if the game is over- if all classes a re  flipped, run endGame function. uses a match counter above - 6 matches is game over. 
var allFlipped = function(){
    if(matchCounter === 6) {
        return true;
    }
    return false;
};





//endGame function, executed when allFLipped is true
function endGame(){
    setTimeout(function(){
        alert("YOU DID IT! Nicolas Cage remembers EVERYTHING. He knows ALL. ")
    },500);

    gameContainer.appendChild(victoryScreen);

    //console.log(currentScore < Number(topScore.innerText)) 
    //above LOGS TRUE, but below code does NOT run ---- Why???????***************

    if (currentscore < Number(topScore.innerText) ) {
        topScore.innerText = currentScore;
        alert("NEW HIGH SCORE! you helped Mr. Cage in only " + currentScore + "Moves! You magnificent bastard!");
     };
   


    setTimeout(function(){
        victoryScreen.remove();
    },5000);

    

}

//if local score is  lower than top score, replace top score with local score, then save into local storage


//find out how to  save new least moves into localstorage


//added victory css class, allFlipped function, endgame function and  victory screen + alert, matchcounter