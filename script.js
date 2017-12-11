//***************************************************************
// Simon game
// by Gwen Latasa
//***************************************************************

//global variable that indicates if it's the players or Simon's turn
let playerToggle = false
let playerScore = 0
let simonScore = 0

let randomColorPattern = []
let numOfFlashes = 2
let colorsAvailable = ['red', 'blue']



//Setup JQuery objects and listeners
let startButton = $('.start-bttn')
startButton.on('click', startGame)

let redCircle = $('.red-bttn')
let blueCircle = $('.blue-bttn')



function generateRandomColorPattern() {
  randomColorPattern=[]
  for( i = 0; i < numOfFlashes; i++){
    //get a random number between 0 and colorsAvailble.length
    randomColorPattern.push( Math.floor(Math.random() * colorsAvailable.length ))
  }
  console.log("the pattern " + randomColorPattern)
}//end generateRandomColorPattern()

function addFlash(theCircle) {
  this.$(theCircle).addClass('flash')
  console.log('added flash ' + this.$(theCircle))

}
function removeFlash(theCircle) {
  $(theCircle).removeClass('flash')
  console.log('remove flash')
}

function flashColorPattern() {

  for( x in randomColorPattern){
    console.log('loop'+x)

    let currCircle = $('.' + colorsAvailable[randomColorPattern[x]] +'-bttn')
    console.log(currCircle)
    let thetime = x
    setTimeout(function(){currCircle.addClass('flash')
                          console.log('timer '+ thetime)},thetime*500)

    setTimeout(function(){
         currCircle.removeClass("flash")
       console.log("inREmoveClass")},(thetime+1)*500)

  }
}


function startGame( event ) {
    console.log('Start game has been clicked')
  //on click generate random color pattern
  generateRandomColorPattern()

  // DOM message for player to begin
  alert('Player Ready?')

  //when player clicks ready, flash the random color pattern
  flashColorPattern()

  //set player toggle equal to true
  //call turnOnPlayerClickEvents()


}//end startGame()
