// GLOBAL VARIABLES ----------------------------
var startedGame, timer, direction, board = undefined;
const UP = 'UP';
const DOWN = 'DOWN';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
var PAUSE = false;
var LIMIT = false;
const SLINKY = 's';
const OBSTACLE = 'o';
const BONUS = 'b';
const BADGUY = 'bg'

const RHYTHM = 100;
const rows = 25;
const cols = 50;


$(document).ready(function() {


// GRID ONCLICK --------------------------------

$('#guides').change(function() {
  if(this.checked) {
    for (let i = 0; i <= 100; i = i+2 ) {
      x1 = 'x1="' + i + '"';
      x2 = 'x2="' + i + '"';
      y1 = 'y1="0"';
      y2 = 'y2="50"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      $gameBoard.append(line);
    }
    for (let i = 0; i <= 50; i = i+2 ) {
      x1 = 'x1="0"';
      x2 = 'x2="100"';
      y1 = 'y1="' + i + '"';
      y2 = 'y2="' + i + '"';
      line = '<line class="line"' + x1 + y1 + x2 + y2 + '/>';
      $gameBoard.append(line);
    }
    $gameBoard.html($gameBoard.html());
  } else {
    $('.line').remove();
  }
});




// MOVEMENT ----------------------------------

function initListeners(user) {

  $(document).keydown((e)=> {
    startedGame = true;
    switch (e.keyCode) {
      case 38:
        direction = UP;
        break;
      case 40:
        direction = DOWN;
        break;
      case 37:
        direction = LEFT;
        break;
      case 39:
        direction = RIGHT;
        break;
      case 32:
        user.shoot();
        break;
      case 80:
        PAUSE = !PAUSE;
      //ESC === 27
      //P === 80
    }
  });

  timer = setInterval(()=>{
    if(!PAUSE && !user.checkBoundaries()){
    switch (direction) {
      case UP:
        user.moveUp();
        break;
      case DOWN:
        user.moveDown();
        break;
      case LEFT:
        user.moveLeft();
        break;
      case RIGHT:
        user.moveRight();
        break;
      }
    }
  }, RHYTHM);
}


// START GAME ----------------------------------

function startGame() {

  board = new GameBoard();
  board.createGrid();
  //console.log(board);

  let user = new User('scully', 3, 2);
  user.initUser();
  initListeners(user);
  console.log(user);

  //REFRESH SVG IN DOM to paint the forms created from jQuery
  //$gameBoard.html($gameBoard.html());
};

startGame();
// $("#startButton").click(function() {
//   startGame();
// });


});
