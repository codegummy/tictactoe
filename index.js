let conditions

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const statusColor = document.querySelector(".statusText");
const x = document.querySelector(".x");
const o = document.querySelector(".o");
const restartBtn = document.querySelector("#restart-button");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
initialiseGame()

function activePlayer() {

  if(currentPlayer == 'X'){
    x.classList.add('active')
    if(o.classList.contains('active')) { o.classList.remove('active')}  

  }

  if(currentPlayer == 'O'){
    o.classList.add('active')
    x.classList.remove('active')

0  }
}

function initialiseGame(){
  activePlayer()
  restartBtn.addEventListener('click', restart)
  cells.forEach(cell=>cell.addEventListener('click',cellClicked))
  running = true


}
function cellClicked(){
  let cellIndex = this.getAttribute('cellIndex')
  if(options[cellIndex] != "" || !running){
    return;
}

updateCell(this, cellIndex);
checkWinner();
  updateCell(this,cellIndex)


}
function updateCell(cell,index){
  options[index] = currentPlayer
  cell.textContent = currentPlayer
  
  checkWinner()
}
function changePlayer(){
  currentPlayer = (currentPlayer == 'X') ? 'O' :'X'
  activePlayer()


}
function checkWinner(){
  let roundWon = false
  for(let i = 0; i < winConditions.length ; i++){
     conditions = winConditions[i]
    let cellA = options[conditions[0]]
    let cellB = options[conditions[1]]
    let cellC = options[conditions[2]]

    if(cellA == '' || cellB == '' || cellC ==''){continue}
    if(cellA == cellB && cellB == cellC ){ 
      roundWon = true

    break
  }
  }

  if(roundWon){
    statusText.textContent = `${currentPlayer} won!!`
    for(let i = 0; i <3; i++){
      cells[conditions[i]].classList.add('win')

    }
    running = false
 
  }
  else if(!options.includes('')){
    statusText.textContent = `Draw`
    running = false
  }else{
    changePlayer()  }

}
function restart(){
  cells.forEach(cell=>cell.textContent='')
   options = ["", "", "", "", "", "", "", "", ""];
 currentPlayer = "X";
 statusText.textContent = ``

 initialiseGame()
 cells.forEach(cell=>{
  if(cell.classList.contains('win')){
    cell.classList.remove('win')
  }
 })



}