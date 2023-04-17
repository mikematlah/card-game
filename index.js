 
let deckId
let remainCards
let compScore= 0
let playerScore= 0

const getDeckBtn =  document.getElementById("get-deck")
const drawCardsBtn =  document.getElementById("draw")
const cardsContainer = document.getElementById("cards")
const playerScoreEl = document.getElementById("my-score")
const compScoreEl = document.getElementById("comp-score")
const messageEl = document.getElementById("message")
const remainderEl = document.getElementById("remainder")
drawCardsBtn.disabled = true
drawCardsBtn.classList.remove("hover")



async function getDeck(){
    const response = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await response.json()
        deckId = data.deck_id
        drawCardsBtn.disabled = false
        drawCardsBtn.classList.add("hover")
        remainCards = data.remaining
        remainderEl.innerText = `Remainimg cards: ${remainCards}`
        console.log(deckId)
   
 }

 async function getTwoCards(){
   
  
    const response = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await response.json()
      
        const card1Img = data.cards[0].image
        const card2Img= data.cards[1].image
        remainCards = data.remaining
        remainderEl.innerText = `Remainimg cards: ${remainCards}`
        messageEl.innerText = getHigherValue(data.cards[0],data.cards[1])
        playerScoreEl.innerText = `My score: ${playerScore}`
        compScoreEl.innerText = `Computer's score: ${compScore} `
        cardsContainer.children[0].innerHTML=
        `<img src=${card1Img} class="card" >`
            
        cardsContainer.children[1].innerHTML=
        `<img src=${card2Img} class="card">`
        console.log(compScore)
        console.log(playerScore)
    }

    function getHigherValue(card1,card2){
        const values = ["2", "3", "4", "5", "6", "7", "8", "9","10", "JACK", "QUEEN", "KING", "ACE"]
        const card1Index = values.indexOf(card1.value)
        const card2Index = values.indexOf(card2.value)
        
        
            
            if(card1Index > card2Index){

                compScore++
                return "Computer Won"

            
                
            } else if(card1Index < card2Index){
                playerScore++
                return "You won!"
            
            } else{
                return "Wor"
            }
    }


function start(){
    window.location.reload()
}

 function pickWinner(){
    if(remainCards ===0){
        if(compScore > playerScore){
            document.body.innerHTML = `
            <h1 class="final-message">Computer has won this game!</h2>
            <button onclick="start()">PLAY AGAIN</button>`
        }else if(compScore < playerScore){
            document.body.innerHTML = `
            <h1 class="final-message">You have won this game!</h2>
            <button onclick="start()">PLAY AGAIN</button>
            `
        }else{
            document.body.innerHTML = `
            <h1 class="final-message">Bothe have won!</h2>
            <button onclick="start()">PLAY AGAIN</button>
           `
        }
    
    }
  
 }



getDeckBtn.addEventListener("click",getDeck)

drawCardsBtn.addEventListener("click",function(){
   
    
    if(deckId && remainCards > 0){

    
        drawCardsBtn.disabled = false
        getTwoCards()
    
    } else{
        pickWinner()
        drawCardsBtn.disabled = true
        drawCardsBtn.classList.remove("hover")
    }
 

 })







