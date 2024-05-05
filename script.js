//GLOBAL VARIABLES
let playerColour = 0; //Taken from Buttons on Modal, 1 = red, 2 = blue
const grid = new Array(9); //initialize grid as array
let playerMove = 0;
let cpuFirstMove = 0;
let prevPlayerMoves = new Array(5);
let prevCpuMoves = new Array(5);
let playerWin = 0;

for (let i = 0; i < grid.length; i++)
  {
    console.log("Cell #" + i + " is in the array");
    grid[i] = document.getElementById("grid-square-" + i);
  }//Set onscreen grid cells as array


// FUNCTIONS

//Clear Board- mostly for Dev
function ClearBoard(){
  for (let j = 0; j < 9; j++){
    var innerCircletoClear = grid[j].childNodes[1];
    innerCircletoClear.classList.remove("dot");
    innerCircletoClear.classList.remove("circle");
  }
  prevPlayerMoves = [];
  prevCpuMoves = [];
  playerMove = 0;
    cpuFirstMove = 0;
  document.getElementById("modal-holder").classList.remove("hidden");
  document.getElementById('user-message1').innerHTML = '';
  document.getElementById('user-message2').innerHTML = "";
  playerWin = 0;
}
//Step 1. Set Player Colour
function SetColour(n){
  playerColour = n; //Takes the parameter passed through the function and sets it as the "playerColor" variable
  console.log ("Colour is " + n);
  if (n === 1)
    {
      document.getElementById('user-message1').innerHTML += 'Player is DOT';
    }
  if (n === 2)
    {
      document.getElementById('user-message1').innerHTML += 'Player is CIRCLE';
    }
  
  document.getElementById("modal-holder").classList.add("hidden"); //Hide modal
}

//Step 2. Set up player moves
function PlayerMove(n) {
  var innerCircle = grid[n].childNodes[1]; //set a variable for "#inner-circle"
  if(prevPlayerMoves.includes(n) || prevCpuMoves.includes(n)){
    console.log("pick a new square");
    document.getElementById('user-message2').innerHTML = 'That square is already taken';
  }
  else{
    if(playerMove === 1){
      console.log("its not your turn");
      document.getElementById('user-message2').innerHTML = "It's not your turn yet";
    }
    if (playerColour === 1 && playerMove === 0){ //check player Colour and if player has already moved
 innerCircle.classList.add("dot"); //Add appropriate background colour to "#inner-circle" 
    console.log ("Cell #" + n + " Selected - Player");
    prevPlayerMoves.push(n);
  }
    if (playerColour === 2 && playerMove === 0){  innerCircle.classList.add("circle");
 console.log ("Cell #" + n + " Selected - Player");
 prevPlayerMoves.push(n);
  }
  
  playerMove = 1;
    cpuFirstMove = 0;
    CheckPlayerWin();
    TestTie()
  setTimeout(()=>{ComputerMove();}
      ,500);
  }
  }

//Step 3. Set up first computer move-- Random choice
//to code proper logic later

function ComputerMove(){
  
  var firstComputerInt = Math.floor(Math.random() * 9);
  var innerCircle = grid[firstComputerInt].childNodes[1]; //set a variable for "#inner-circle"
  if(playerWin === 0){
    if(prevPlayerMoves.includes(firstComputerInt) || prevCpuMoves.includes(firstComputerInt)){
    console.log("rerolled");
    ComputerMove(); //Reroll
    return;
  }
  else{
  if (playerColour === 2 && cpuFirstMove === 0){ //check player Colour and if computer has moved 
 innerCircle.classList.add("dot") //Add appropriate background colour to "#inner-circle", with a short delay
    console.log ("Cell #" + firstComputerInt + " Selected - CPU");
playerMove = 0;
    prevCpuMoves.push(firstComputerInt);
    CheckCpuWin();
  }
    if (playerColour === 1 && cpuFirstMove === 0){  innerCircle.classList.add("circle");
 console.log ("Cell #" + firstComputerInt + " Selected - CPU");
 playerMove = 0;
 prevCpuMoves.push(firstComputerInt);
 setTimeout(()=>{CheckCpuWin();},1000);
 TestTie();
  } 
  cpuFirstMove = 1;
  }
  }
  else{
    return;
  }
}
//Win Conditions
  //Horizontal
  function CheckPlayerWin(){
    //check for horizontal win
    console.log("Previous player moves:")
    prevPlayerMoves.forEach(console.log);
    let horizArray1 = [0,1,2];
    let horizArray2 = [3,4,5];
    let horizArray3 = [6,7,8];
    let vertiArray1 = [0,3,6];
    let vertiArray2 = [1,4,7];
    let vertiArray3 = [2,5,8];
    let diagArray1 = [0,4,8];
    let diagArray2 = [2,4,6];
    if (horizArray1.every(i => prevPlayerMoves.includes(i)) || 
        horizArray2.every(i => prevPlayerMoves.includes(i)) ||
        horizArray3.every(i => prevPlayerMoves.includes(i)))
      {
        console.log("youwin!");
        document.getElementById('user-message2').innerHTML = "You Win!";
        setTimeout(()=>{ClearBoard();},1000);
        playerWin = 1;
      }
    if (vertiArray1.every(i => prevPlayerMoves.includes(i)) || 
        vertiArray2.every(i => prevPlayerMoves.includes(i)) ||
        vertiArray3.every(i => prevPlayerMoves.includes(i)))
      {
        console.log("youwin!");
        document.getElementById('user-message2').innerHTML = "You Win!";
        setTimeout(()=>{ClearBoard();},1000);
        playerWin = 1;
      }
    if (diagArray1.every(i => prevPlayerMoves.includes(i)) || 
        diagArray2.every(i => prevPlayerMoves.includes(i)))
      {
        console.log("youwin!");
        document.getElementById('user-message2').innerHTML = "You Win!";
        setTimeout(()=>{ClearBoard();},1000);
        playerWin = 1;
      }
  }
function CheckCpuWin(){
  console.log("Previous cpu moves:")
    prevCpuMoves.forEach(console.log);
    //check for horizontal win
    let horizArray1 = [0,1,2];
    let horizArray2 = [3,4,5];
    let horizArray3 = [6,7,8];
    let vertiArray1 = [0,3,6];
    let vertiArray2 = [1,4,7];
    let vertiArray3 = [2,5,8];
    let diagArray1 = [0,4,8];
    let diagArray2 = [2,4,6];
    if (horizArray1.every(i => prevCpuMoves.includes(i)) || 
        horizArray2.every(i => prevCpuMoves.includes(i)) ||
        horizArray3.every(i => prevCpuMoves.includes(i)))
      {
        console.log("You lose :(");
        setTimeout(()=>{document.getElementById('user-message2').innerHTML = "You Lose :(";},1000);
        setTimeout(()=>{ClearBoard();},1500);
      }
    if (vertiArray1.every(i => prevCpuMoves.includes(i)) || 
        vertiArray2.every(i => prevCpuMoves.includes(i)) ||
        vertiArray3.every(i => prevCpuMoves.includes(i)))
      {
        console.log("You lose :(");
        setTimeout(()=>{document.getElementById('user-message2').innerHTML = "You Lose :(";},1000);
        setTimeout(()=>{ClearBoard();},1500);
      }
    if (diagArray1.every(i => prevCpuMoves.includes(i)) || 
        diagArray2.every(i => prevCpuMoves.includes(i)))
      {
        console.log("You lose :(");
        setTimeout(()=>{document.getElementById('user-message2').innerHTML = "You Lose :(";},1000);
        setTimeout(()=>{ClearBoard();},1500);
      }
  }
function TestTie(){
  for (var k = 0; k < 9, k++;)
    {
      if(grid[k] == '')
        {
          console.log("yup");
        }
      console.log("nope");
    }
}