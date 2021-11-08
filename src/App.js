
import './App.css';

function App() {
  const getEmptyBoard = () =>
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]

  const valueCheck = (board, value) => {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (board[x][y] === value) {
          return true;
        }
      }
      return false;
    }
  };

  const isFull = (board) => {
    return !valueCheck(board, 0);
  }

  const getRandomPosition = () => {
    const xPos = Math.floor(Math.floor() * 4);
    const yPos = Math.floor(Math.floor() * 4);
  }
  
  const generateRandom = (board) => {
    if (isFull(board)) {
      return board
    }

    let [x,y] = getRandomPosition();
    while (board[x][y] !== 0) {
      [x,y] = getRandomPosition();
    }
    board[x][y] = 2;
    return board;
  }

  const swipeL = (board) => {
    const newBoard = getEmptyBoard();
    for (let x = 0; x < 4; x++) {
      let yCol = 0;
      for (let y = 0; y < 4; y++) {
        if (board[x][y] !== 0) {
          newBoard[x][yCol] = board[x][y];
          yCol++
        }
      }
    }
    console.log(newBoard)
    return newBoard;
  }

  const swipeR = (board) => {
    const newBoard = getEmptyBoard();
    for (let x = 0; x < 4; x++) {
      let yCol = 3;
      for (let y = 0; y < 4; y++) {
        if (board[x][y] !== 0) {
          newBoard[x][yCol] = board[x][y];
          yCol--
        }
      }
    }
    return newBoard
  }

  const rotateLeft = (board) => {
    const rotatedBoard= getEmptyBoard();
    for (let x = 0;x < 4; x++){
      for (let y = 0; y<4; y++) {
        rotatedBoard[x][y] = board[y][board[x].length - 1 - x];
      }
    }
    return rotatedBoard;
  };

  const rotateRight = (board) => {
    const rotatedBoard= getEmptyBoard();
    for (let x = 0;x < 4; x++){
      for (let y = 0; y<4; y++) {
        rotatedBoard[x][y] = board[board[x].length - 1 - y][x];
      }
    }
    return rotatedBoard;
  }; 

  const mergeLine = (board) => {
    for (let x = 0; x < 4; x++){
      for (let y = 0; y < board[x].length - 1; y++){
        if (board[x][y] !== 0 && board[x][y] === board[x][y+1]){
          board[x][y] = board[x][y] * 2;
          board[x][y + 1] = 0;
        }
      }
    }
    return board;
  }

  const mergeColumn = (board) => {
    for (let x = 0; x < 3; x++){
      for (let y = 0; y < 4; y++){
        if (board[x][y] !== 0 && board[x][y] === board[x+1][y]){
          board[x][y] = board[x][y] * 2;
          board[x-1][y] = 0;
        }
      }
    }
    return board;
  }

  const moveLeft = () => {
    board = swipeL(board);
    board = mergeLine(board);
    board = swipeL(board);
    board = generateRandom(board);
  }

  const moveRight = () => {
    swipeR(board);
    mergeLine(board)
    swipeR(board)
    board = generateRandom(board);
  }

  const moveUp = () => {
    board = rotateLeft(board);
    board = swipeL(board);
    board = mergeLine(board);
    board = swipeL(board);
    board = rotateRight(board);
    board = generateRandom(board);
  }

  const moveDown = () => {
    board = rotateLeft(board);
    board = swipeR(board);
    board = mergeLine(board);
    board = swipeR(board);
    board = rotateRight(board);
    board = generateRandom(board);
  }

  const checkWin = (board) => {
    return valueCheck(board, 2048);
  }

  const boardsSame = (board, newBoard) => {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (board[x][y] !== newBoard[x][y]) {
          return true;
        }
      }
    }
    return false;
  }

  const gameOver = (board) => {
    if (boardsSame(board, moveLeft(board))) {
      return false;
    }
    if (boardsSame(board, moveRight(board))) {
      return false;
    }
    if (boardsSame(board, moveUp(board))) {
      return false;
    }
    if (boardsSame(board, moveDown(board))) {
      return false;
    }
    return true;
  };

  let board = 
  [[0, 0, 2, 0],
  [0, 2, 2, 4],
  [2, 0, 2, 0],
  [0, 2, 0, 0]];
  
  console.log(board);
  moveDown(board);
  console.log(board);


  return (
    <div className="App">
      <p>s</p>
    </div>
  );
}

export default App;
