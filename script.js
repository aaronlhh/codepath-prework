// Global Variables
var pattern = [1,2,3,4,5,6,7,8];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var mistakeNum = 0;   // keeps track of the number of mistakes

// global constants
const clueHoldTime = 500; //how long to hold each clue's light/sound
const cluePauseTime = 250; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence


function startGame(){
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  playClueSequence();
}

function stopGame(){
  gamePlaying = false;
  
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}


// Sound Synthesis Functions
const freqMap = {
  1: 261.626,
  2: 293.665,
  3: 329.628,
  4: 349.228,
  5: 391.9954,
  6: 440.0000,
  7: 493.8833,
  8: 523.2511
}
function playTone(btn,len){ 
  // o.frequency.value = freqMap[btn]
  // g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  // context.resume()
  document.getElementById(btn).play();
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    // context.resume()
    // o.frequency.value = freqMap[btn]
    // g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    // context.resume()
    document.getElementById(btn).play();
    tonePlaying = true
  }
}
function stopTone(){
  // g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
  document.getElementById("hint").innerHTML = "Repeat the pattern back to win the game!";
}

// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)


function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}


function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  context.resume()
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    // each time of playing, modify the corresponding place to be a random button number
    pattern[i] = Math.floor(Math.random()*7)+1;
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}



function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won!");
}


function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  
  // add game logic here
  if(pattern[guessCounter] == btn){
    if(guessCounter == progress){
      // win the game
      if(progress == pattern.length-1){
        winGame();
      }else{
        progress++;
        playClueSequence();
      }
      
    }else{
      // still not finish guessing
      guessCounter++;
    }
    
  }else if(mistakeNum < 3){
    // if player makes mistakes for less than three times, 
    //   retry the sequence
    console.log("mistakeNum = " + (mistakeNum+1));
    document.getElementById("hint").innerHTML = "Guess wrong! Please try the whole sequence again! mistakeNum = " + (mistakeNum+1);
    guessCounter = 0;
    mistakeNum++;
    
  }else{
    // not guessing right for three times
    loseGame();
  }
}