//***************************************************************
// Simon game
// by Gwen Latasa
//***************************************************************

//global variable that indicates if it's the players or Simon's turn
let playerToggle = false
let playerScore = 0
let simonScore = 0
let currentLevel = 1
let levels = [{level:1, flashes:4},
              {level:2, flashes:5},
              {level:3, flashes:6},
              {level:4, flashes:7},
              {level:5, flashes:8}]

let randomColorPattern = []
// let numOfFlashes = 4
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
    let theCircle =$('.' + colorsAvailable[x] +'-circle')
    theCircle.on('click', checkIfCorrect)


    // theCircle.addClass('circle-active:active')
    // theCircle.on('mouseover', function(){$(this.addClass('circle-active')}).on('mouseout',
    //                           function(){$(this).removeClass('circle-active')})
  }//end for

}//end turnOnPlayerClickEvents()

function turnOffPlayerClickEvents(){
  for( x in colorsAvailable){
     $('.' + colorsAvailable[x] +'-circle').off() //.removeClass('circle-active')
  }//end for

  //enable startButton
  $('.start-bttn').prop('disabled', false)

  playerToggle = false
}

function generateRandomColorPattern() {
  randomColorPattern=[]
  for( i = 0; i < levels[currentLevel-1].flashes; i++){
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
        //set player toggle equal to true
        playerToggle = true
      }//end else
      x++
    }, 1000)//end set interval

}//end flashColorPattern()

function checkIfCorrect(){
  //function checks to see if the circle clicked
  //matches the first(next) item in the randomColorPattern
 console.log('clicked color'+ parseInt($(this).attr('data-color'), 10))
  if(parseInt($(this).attr('data-color'), 10) === randomColorPattern.shift())
  {
    if( randomColorPattern.length === 0 ){
      //FIX change DOM to say You win!
      if(currentLevel === levels.length){
        let dialog = $('.game-messages')
        dialog.html('You Win!')
        dialog.show()
        setTimeout(function(){ dialog.hide()}, 1000)
        //alert("You Win!")
        //FIX-disable start
        // $('.start-bttn').prop('disabled', true)
        //FIX-prompt New Game?

      }
      else {
        //alert( "Level Up!")
        let dialog = $('.game-messages')
        dialog.html('Level Up!')
        dialog.show()
        setTimeout(function(){ dialog.hide()}, 1000)
        currentLevel += 1
        $('.level').html('Level: ' + currentLevel)
      }
      playerScore += 1
      $('.player-score').html('You: ' + playerScore)

      turnOffPlayerClickEvents()
    }
    //else
    //then keep going
  }
  else{
    //FIX change DOM to say You Lose!
    alert("Try Again!")
    simonScore += 1
    $('.simon-score').html('Simon: ' + simonScore)
    turnOffPlayerClickEvents()
  }
}//end checkIfCorrect()

//FIX make New Game function

function startGame( event ) {
  //disable start button
  $('.start-bttn').prop('disabled', true)

  //on click generate random color pattern
  generateRandomColorPattern()

  // DOM message for player to begin
  //FIX message direct to DOM
  // alert('Player Ready?')
  // $('main').append(`<dialog open> Player Ready? </dialog>`)
  let dialog = $('.game-messages')
  dialog.html('Get Ready!')
  dialog.show()
  setTimeout(function(){ dialog.hide()}, 1000)
  // dialog.html('Set')
  // dialog.show()
  // setTimeout(function(){ dialog.hide()}, 1000)
  // dialog.html('Go')
  // dialog.show()
  // setTimeout(function(){ dialog.hide()}, 1000)

  //when player clicks ready, flash the random color pattern
  flashColorPattern()

  //FIX-- check logic of this?
  // console.log("assuming the user won't try to play until all the colors flash...")
  //could set an interval to check if player toggle set to true???

  let checkIfPlayerTurn = setInterval( function(){
                            if(playerToggle){
                              clearInterval(checkIfPlayerTurn)
                              turnOnPlayerClickEvents()
                              dialog.html('Your Turn!')
                              dialog.show()
                              setTimeout(function(){ dialog.hide()}, 1000)
                            }
                          },2000)//end setInterval






}//end startGame()

// $('.circle:active').prop
