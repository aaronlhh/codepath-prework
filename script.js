// Global Variables
var pattern = [1,2,3,4,5,6,7,8];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var mistakeNum = 0;   // keeps track of the number of mistakes
var timeSoFar = 10;     // keeps track of the time for player to begin each try
var interval;
var regularSmileyFace = `<span><img src="https://cdn.glitch.global/7dc64b04-718e-4e47-9fb0-22cd16a13130/Screen%20Shot%202022-03-25%20at%2021.35.36.png?v=1648269383946"
                   width="70px" ></span>`
var clickedFace = `<span><img src="https://cdn.glitch.global/7dc64b04-718e-4e47-9fb0-22cd16a13130/Screen%20Shot%202022-03-25%20at%2021.35.43.png?v=1648269385258"
                   width="70px" ></span>`

// global constants
const clueHoldTime = 400; //how long to hold each clue's light/sound
const cluePauseTime = 250; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence


function startGame(){
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  mistakeNum = 0;
  playClueSequence();
}

function stopGame(){
  gamePlaying = false;
  document.getElementById("hint").innerHTML = "Repeat the pattern back to win the game!";
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  mistakeNum = 0;
  clearInterval(interval);
  timeSoFar = 10;
  progress = 0;
  guessCounter = 0;
  document.getElementById("counter").innerHTML = "CountDown: " + timeSoFar + ", Level: " + (progress+1) + ", Mistake: " + mistakeNum;
  for(var i = 1; i <= 7; i++){
    document.getElementById("button"+i).innerHTML = regularSmileyFace ;
  }
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
  document.getElementById("button"+btn).innerHTML = clickedFace ;
  tonePlaying = true
  setTimeout(function(){
    stopTone(btn)
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    // context.resume()
    // o.frequency.value = freqMap[btn]
    // g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    // context.resume()
    document.getElementById(btn).play();
    document.getElementById("button"+btn).innerHTML = clickedFace ;
    tonePlaying = true
    guess(btn);
  }
}
function stopTone(btn){
  // g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
  document.getElementById("button"+btn).innerHTML = regularSmileyFace ;
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
  if(!gamePlaying){
    return;
  }
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
  setTimeout(startCount, delay-clueHoldTime-cluePauseTime);
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
  if(!gamePlaying){
    return;
  }
  console.log("user guessed: " + btn);
  
  // add game logic here
  if(pattern[guessCounter] == btn){
    
    document.getElementById("hint").innerHTML = "Repeat the pattern back to win the game!";
    if(guessCounter == progress){
      // win the game
      if(progress == pattern.length-1){
        winGame();
      }else{
        progress++;
        stopCount();
        playClueSequence();
      }
      
    }else{
      // still not finish guessing
      guessCounter++;
    }
    
  }else if(mistakeNum < 3){
    // if player makes mistakes for less than three times, 
    //   retry the sequence
    mistakeNum++;
    console.log("mistakeNum = " + mistakeNum);
    document.getElementById("hint").innerHTML = "Guess wrong! Please try the whole sequence again!";
    guessCounter = 0;
    stopCount();
    startCount();
  }else{
    // not guessing right for three times
    loseGame();
  }
}




// increment time count for each turn
function timeCount(){
  if(!gamePlaying){
    return;
  }
  
  timeSoFar--;
  document.getElementById("counter").innerHTML = "CountDown: " + timeSoFar + ", Level: " + (progress+1) + ", Mistake: " + mistakeNum;
  
  if(mistakeNum < 3 && timeSoFar == -1){
    mistakeNum++;
    console.log("mistakeNum = " + mistakeNum);
    document.getElementById("hint").innerHTML = "Guess wrong! Please try the whole sequence again!";
    guessCounter = 0;
    stopCount();
  }else if(timeSoFar == -1 && mistakeNum >= 3){
    loseGame();
  }
}

function startCount(){
  if(!gamePlaying){
    return;
  }
  interval = setInterval(timeCount, 1000);
}

function stopCount(){
  clearInterval(interval);
  if(mistakeNum <= 3 && gamePlaying && timeSoFar == -1){
    startCount();
  }
  timeSoFar = 10;
  document.getElementById("counter").innerHTML = "CountDown: " + timeSoFar + ", Level: " + (progress+1) + ", Mistake: " + mistakeNum;
}



// replay the sequence again and it cost one mistake time
function replay(){
  if(!gamePlaying){
    return;
  }
  if(mistakeNum == 3){
    document.getElementById("hint").innerHTML = "Cannot replay with mistakeNum = 3";
    return;
  }
  
  stopCount();
  
  // increment the mistake numbers
  mistakeNum++;
  console.log("mistakeNum = " + mistakeNum);
  document.getElementById("hint").innerHTML = "Replay";
  guessCounter = 0;
  
  // resume the sequence
  context.resume()
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("replay single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  
  // start timecounting again
  setTimeout(startCount, delay-clueHoldTime-cluePauseTime);
}


