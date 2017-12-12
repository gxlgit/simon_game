//***************************************************************
// Simon game
// by Gwen Latasa
//***************************************************************

//global variable that indicates if it's the players or Simon's turn
let playerToggle = false
let playerScore = 0
let simonScore = 0

let randomColorPattern = []
let numOfFlashes = 4
let colorsAvailable = ['red', 'blue', 'yellow', 'green']



//Setup JQuery objects and listeners
let startButton = $('.start-bttn')
startButton.on('click', startGame)

//populate HTML with circles
for(x in colorsAvailable){
  $('.game').append(`<div class='circle ${colorsAvailable[x]}-circle' data-color=${x}></div>`)
  $(`.${colorsAvailable[x]}-circle`).css('background-color', colorsAvailable[x])
}


function turnOnPlayerClickEvents(){
  // playerColorPattern = []
  for( x in colorsAvailable){
    $('.' + colorsAvailable[x] +'-circle').on('click', checkIfCorrect)
  }//end for
}//end turnOnPlayerClickEvents()

function turnOffPlayerClickEvents(){
  for( x in colorsAvailable){
    $('.' + colorsAvailable[x] +'-circle').off()
  }//end for

  //enable startButton
  $('.start-bttn').prop('disabled', false)
}

function generateRandomColorPattern() {
  randomColorPattern=[]
  for( i = 0; i < numOfFlashes; i++){
    //get a random number between 0 and colorsAvailble.length
    randomColorPattern.push( Math.floor(Math.random() * colorsAvailable.length ))
  }
  console.log("the pattern " + randomColorPattern)
}//end generateRandomColorPattern()


function flashColorPattern() {
  //this function sets an setInterval
  //every 1 sec it will set the turnFlashOn and turnFlashOff timers for each circle
  //in the randomColorPattern
  //this keeps colors from flashing at the same time or out of order
  let x = 0
  let theTimer = setInterval(function(){

      let currCircle = $('.' + colorsAvailable[randomColorPattern[x]] +'-circle')

      if(x < randomColorPattern.length){
        setTimeout(function(){currCircle.addClass('flash')},(.5)*500)
        setTimeout(function(){currCircle.removeClass("flash")},(1.5)*500)
      }//end if
      else{
        //if at the end randomColorPattern turn off Interval Timer
        clearInterval(theTimer)
      }//end else
      x++
    }, 1000)//end set interval

}//end flashColorPattern()

function checkIfCorrect(){
  //function checks to see if the circle clicked
  //matches the first(next) item in the randomColorPattern

  if(parseInt($(this).attr('data-color'), 10) === randomColorPattern.shift())
  {
    if( randomColorPattern.length === 0 ){
      //FIX change DOM to say You win!
      alert( "You Win!")
      playerScore += 1
      $('.player-score').html('You: ' + playerScore)
      turnOffPlayerClickEvents()
    }
    //else
    //then keep going
  }
  else{
    //FIX change DOM to say You Lose!
    alert("You Lose!")
    simonScore += 1
    $('.simon-score').html('Simon: ' + simonScore)
    turnOffPlayerClickEvents()
  }
}//end checkIfCorrect()



function startGame( event ) {
  //disable start button
  $('.start-bttn').prop('disabled', true)

  //on click generate random color pattern
  generateRandomColorPattern()

  // DOM message for player to begin
  //FIX message direct to DOM
  alert('Player Ready?')

  //when player clicks ready, flash the random color pattern
  flashColorPattern()

  //FIX-- check logic of this?
  // console.log("assuming the user won't try to play until all the colors flash...")
  //could set an interval to check if player toggle set to true???

  //set player toggle equal to true
  playerToggle = true

  turnOnPlayerClickEvents()

}//end startGame()
