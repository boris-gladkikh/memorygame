const cards = document.querySelectorAll(".memory_card");

var hasflippedCard = false;
var lockBoard = true;
var firstCard,secondCard;
var currentScore = 0;

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
}

function checkForMatch(){      
    if (firstCard.dataset.name === secondCard.dataset.name) {
        //match - remove flip event,  leaves card face up
        disableCards();       
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
    cards.forEach(function(value){
        value.classList.remove("flip");
        currentScore = 0;
        scoreValue.innerText = currentScore;
        value.addEventListener("click", flipCard);
    })
    setTimeout(function(){
        alert("Start!");
    },200) 
})

//append victory class to the memorygame dom, which is a big red box with white text that says "victory"
// alert box that says you win, and some nicolas cage stuff
//if score is lower than least moves, replace least moves with score
//save new least moves into localstorage
// remove victory class from memorygame container
//resetboard, make function from new game event into full reset, use function from new game button 
//shuffle board
