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
// let playerColorPattern =[]


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
  //FIX  need to enable startButton
}

function generateRandomColorPattern() {
  randomColorPattern=[]
  for( i = 0; i < numOfFlashes; i++){
    //get a random number between 0 and colorsAvailble.length
    randomColorPattern.push( Math.floor(Math.random() * colorsAvailable.length ))
  }
  console.log("the pattern " + randomColorPattern)
}//end generateRandomColorPattern()

// function addFlash(theCircle) {
//   theCircle.addClass('flash')
//   console.log('added flash ' + theCircle)
//
// }
// function removeFlash(theCircle) {
//   theCircle.removeClass('flash')
//   console.log('remove flash')
// }

function flashColorPattern() {

//  for( x in randomColorPattern){
    // console.log('loop'+x)

    // let currCircle = $('.' + colorsAvailable[randomColorPattern[x]] +'-circle')
    // console.log(currCircle)
    //let theTime = x

let x = 0
  let theTimer = setInterval(function(){
    console.log("the interval: " + x)
    let currCircle = $('.' + colorsAvailable[randomColorPattern[x]] +'-circle')
    if(x < randomColorPattern.length){
    setTimeout(function(){
                          currCircle.addClass('flash')
                        },(.5)*500)

    setTimeout(function(){currCircle.removeClass("flash")},(1.5)*500)
  }//end if
  else{
    clearInterval(theTimer)
  }//end else
  x++
}, 1000)//end set interval

   //this kind of works
    // setTimeout(function(){
    //                       currCircle.addClass('flash')
    //                     },(theTime+.5)*300)
    //
    // setTimeout(function(){currCircle.removeClass("flash")},(theTime+1.5)*300)

//  }//end for
}//end flashColorPattern()

function checkIfCorrect(){
  // console.log('checkIfCorrect')
  // console.log($(this).attr('data-color'))
  //might have to keep track of user clicks if this doesntwork
  if(parseInt($(this).attr('data-color'), 10) === randomColorPattern.shift())
  {
    if( randomColorPattern.length === 0 ){
      alert( "You Win!")
      playerScore += 1
      $('.player-score').html('You: ' + playerScore)
      turnOffPlayerClickEvents()
    }
    //else
    //then keep going
  }
  else{
    // console.log("You Lose!")
    alert("You Lose!")
    simonScore += 1
    $('.simon-score').html('Simon: ' + simonScore)
    turnOffPlayerClickEvents()
  }
}//end checkIfCorrect()





function startGame( event ) {
    console.log('Start game has been clicked')
  //FIX- disable start button???

  //on click generate random color pattern
  generateRandomColorPattern()

  // DOM message for player to begin
  alert('Player Ready?')

  //when player clicks ready, flash the random color pattern
  flashColorPattern()

  console.log("assuming the user won't try to play until all the colors flash...")
  //could set an interval to check if player toggle set to true???
  //set player toggle equal to true
  playerToggle = true

  turnOnPlayerClickEvents()


}//end startGame()
