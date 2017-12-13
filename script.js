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
              {level:2, flashes:5}]//,
            //  {level:3, flashes:6}]//,
              // {level:4, flashes:7},
              // {level:5, flashes:8}]
let theHallOfFame = []
let randomColorPattern = []
// let numOfFlashes = 4
let colorsAvailable = ['red', 'blue', 'yellow', 'green']



//Setup JQuery objects and listeners
let startButton = $('.start-bttn')
startButton.on('click', startGame)



setupHallOfFame()
makeCircles()


function makeCircles(){
  //populate HTML with circles
  for(x in colorsAvailable){
    $('.game').append(`<div class='circle ${colorsAvailable[x]}-circle' data-color=${x}></div>`)
    $(`.${colorsAvailable[x]}-circle`).css('background-color', colorsAvailable[x])
  }
}//makeCircles()

let dialog = $('.game-messages')

function showGameDialog( dialogText ){
  dialog.html(dialogText)
  dialog.show()
}//showGameDialog()

function hideGameDialog(){
  setTimeout(function(){ dialog.hide()}, 1000)
}

let getInitialsDialog = $('.get-initials')
//FIX ---NEED to actually implement this in addNewHallOfFamer
function showGetInitialsDialog(){
  getInitialsDialog.show()
}//showGetInitialsDialog()

//showGetInitialsDialog()

function setupHallOfFame(){
  //Setup Hall of Fame by reading from local storage
  //https://www.w3schools.com/html/html5_webstorage.asp
  if (typeof(Storage) !== "undefined") {
      //if there is localStorage then populate HTML with high scores
      for( let x =1; x <=10; x++){
        let currInitial =localStorage.getItem(`initial${x}`)
        let currScore = localStorage.getItem(`score${x}`)
          //if currItem is not undefined
          if(currInitial && currScore){
            //FIX -add an extra space in 1-9 so that items line up?
            $(`.init${x}`).html(currInitial)
            $(`.high-score${x}`).html(currScore)
            theHallOfFame[x-1] = [currInitial, parseInt(currScore,10 )]
          }//end if
      }//end for
  }//end if storage
  // else {
  //     // Sorry! No Web Storage support..
  //     console.log('no local storage')
  // }
}//setupHallOfFame()


function addNewHallOfFamer (theScore) {
  //1st check to see if score is high enough to be on list
  //by checking to see if it's greater than the last score
  //on the list
  let theInitials =''

  if (theHallOfFame.length < 10) {
    //get initials
    theInitials = prompt('User Initials:')
    theHallOfFame.push([theInitials.slice(0,3).toUpperCase(), theScore])
  }
  else {
      //if so append item to list
      if(theScore > theHallOfFame[theHallOfFame.length -1][1]){
        theInitials = prompt('User Initials:')
        theHallOfFame.pop()
        theHallOfFame.push([theInitials.slice(0,3).toUpperCase(), theScore])
      }
      //else score is not high enough
      else { return }
  }
  //sort list so that it's in order
  theHallOfFame.sort(function(a, b){return b[1] - a[1]});
  //update localStorage w/new list of high scores
  theHallOfFame.forEach(function(thePerson, index){
            localStorage.setItem(`initial${index+1}`, thePerson[0])
            localStorage.setItem(`score${index+1}`, thePerson[1])
  })
  //5th update html w/updateHallOfFame
  setupHallOfFame()
}//end addNewHallOfFamer()

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
      //check if the currentLevel is the last level
      if( currentLevel === levels.length ){
        let x =0
        let youWinInterval = setInterval(
          function(){
            if(x=== 0){
              showGameDialog('You Win!')
              setTimeout(function(){ dialog.hide()
              x++}, 1000)
            }//end if
            else{
              clearInterval(youWinInterval)
              addNewHallOfFamer(playerScore+1)
            }
        }, 1500)//end setInterval
      }// end if currentLevel is last level
      else {
        showGameDialog('Level Up!')
        setTimeout(function(){ dialog.hide()
        x++}, 1000)
        currentLevel += 1
        $('.level').html('Level: ' + currentLevel)
        disableStart(false)
      }
      playerScore += 1
      $('.player-score').html('Score: ' + playerScore)

      turnOffPlayerClickEvents()
    }//end if end of randomColorPattern
    //else
    //then keep going
  }
  else{
    let x = 0
    let youLoseInterval = setInterval(
      function(){
        if(x=== 0){
          showGameDialog('You Lose!')
          setTimeout(function(){ dialog.hide()
          x++}, 1000)
        }//end if
        else{
          clearInterval(youLoseInterval)
          addNewHallOfFamer(playerScore)
        }
    }, 1500)//end setInterval
    // showGameDialog('You Lose')
    // setTimeout(function(){ dialog.hide()}, 1000)
    // simonScore += 1
    // $('.simon-score').html('Simon: ' + simonScore)
    turnOffPlayerClickEvents()
  }
}//end checkIfCorrect()

function disableStart(toggleValue) {
  //true means  disable
  //false means
  console.log('disableval'+ toggleValue)
  $('.start-bttn').prop('disabled', toggleValue)
}

// function disableNewgame(toggleValue) {
//   $('.newgame-bttn').prop('disabled', toggleValue)
// }

function startGame( event ) {
  //disable start button
  disableStart(true)

  //on click generate random color pattern
  generateRandomColorPattern()

  // DOM message for player to begin

  let dialog = $('.game-messages')
  dialog.html('Get Ready!')
  dialog.show()
  setTimeout(function(){ dialog.hide()}, 1000)


  //when player clicks ready, flash the random color pattern
  flashColorPattern()

  //set an interval to check if player toggle set to true
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

// function newGame() {
//
// }//newGame()
