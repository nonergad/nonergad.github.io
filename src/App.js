
import './App.css';
import React,{useEffect, useState} from 'react';
import Tiles from './Titles/Tiles';
import GameOverScr from './GameOver/GameOverScr';
import GameWinScr from './GameOver/GameOverScr';
import StartGameScr from './StartGame/StartGame';

function App() {
  const [gameOver,setGameover] = useState(false)
  const [gameWin,setWin] = useState(false)
  const [startGame,setStartGame] = useState(false)
  const [board,setBoard] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])

  const getEmptyBoard = () =>
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  
  const restart = () => {
    setGameover(false);
    setWin(false);
    setStartGame(true);
    setBoard(generateRandom(getEmptyBoard()))
  }

  const valueCheck = (board, value) => {
    let flag = false
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (board[x][y] == value) {
          flag = true;
        }
      }
    }
    if(!flag){
      return false
    } else{
      return true
    }
  };

  const isFull = (board) => {
    return !valueCheck(board, 0);
  }

  const getRandomPosition = () => {
    const x = Math.floor(Math.random() * 4)
    const y = Math.floor(Math.random() * 4)
    return [x,y]
  }
  
  const generateRandom = (board) => {
    if (isFull(board)) {
      return board
    }
    let randomPos = getRandomPosition();
    while (board[randomPos[0]][randomPos[1]] !== 0) {
      randomPos = getRandomPosition();
    }
    board[randomPos[0]][randomPos[1]] = 2;
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

  const left = () => {
    let copyBoard = [...board]
    copyBoard = swipeL(copyBoard);
    copyBoard = mergeLine(copyBoard);
    copyBoard = swipeL(copyBoard);
    return copyBoard
  }

  const right = () => {
    let copyBoard = [...board]
    copyBoard = swipeR(copyBoard);
    copyBoard = mergeLine(copyBoard);
    copyBoard = swipeR(copyBoard);
    return copyBoard
  }

  const up = () => {
    let copyBoard = [...board]
    copyBoard = rotateLeft(copyBoard);
    copyBoard = swipeL(copyBoard);
    copyBoard = mergeLine(copyBoard);
    copyBoard = swipeL(copyBoard);
    copyBoard = rotateRight(copyBoard);
    return copyBoard
  }

  const down = () => {
    let copyBoard = [...board]
    copyBoard = rotateLeft(copyBoard);
    copyBoard = swipeR(copyBoard);
    copyBoard = mergeLine(copyBoard);
    copyBoard = swipeR(copyBoard);
    copyBoard = rotateRight(copyBoard);
    return copyBoard
  }

  const moveLeft = () => {
    let updatedBoard = left()
    checkWin(updatedBoard);
    updatedBoard = generateRandom(updatedBoard);
    return updatedBoard
  }

  const moveRight = () => {
    let updatedBoard = right()
    checkWin(updatedBoard);
    updatedBoard = generateRandom(updatedBoard);
    return updatedBoard
  }

  const moveUp = () => {
    let updatedBoard = up()
    checkWin(updatedBoard);
    updatedBoard = generateRandom(updatedBoard);
    return updatedBoard
  }

  const moveDown = () => {
    let updatedBoard = down();
    checkWin(updatedBoard);
    updatedBoard = generateRandom(updatedBoard);
    return updatedBoard
  }

  const checkWin = (board) => {
    if(valueCheck(board, 2048)) {
      setWin(true)
    }
  }

  const boardsSame = (board, newBoard) => {
    const boardStr = JSON.stringify(board)
    const newBoardStr = JSON.stringify(newBoard)
    if (boardStr == newBoardStr) {
      return true
    }
    return false
  }

  const animateTile = (board, newBoard, side) => {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (board[x][y] !== newBoard[x][y]) {
          const animated = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
          animated.classList.add('Animatied');
          switch (side) {
            case 'up':
              animated.classList.add('up')
              break;
            case 'down':
              animated.classList.add('down')
              break;
            case 'left':
              animated.classList.add('left')
              break;
            case 'right':
            animated.classList.add('right')
            break;
          }
        }
      }
    }
  };

    const isGameOver = (board) => {
    if (!boardsSame(board, moveLeft())) {
      return false;
    }
    if (!boardsSame(board, moveRight())) {
      return false;
    }
    if (!boardsSame(board, moveUp())) {
      return false;
    }
    if (!boardsSame(board, moveDown())) {
      return false;
    }
    setGameover(true)
  };
  
   const keyHandler = (e) => {
     const copyBoard = [...board]
     let newBoard;
      switch (e.key) {
        case 'ArrowUp':
          isGameOver(copyBoard);
          newBoard =up();
          animateTile(board, newBoard, 'up')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('up')
                e.classList.remove('Animatied')
              })
              setBoard(moveUp())
            } , 300);
          }
          break;
        case 'ArrowRight':
          isGameOver(copyBoard);
          newBoard = right();
          animateTile(board, newBoard, 'right')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('right')
                e.classList.remove('Animatied')
              })
              setBoard(moveRight())
            } , 300);
          }
          break;
        case 'ArrowDown':
          isGameOver(copyBoard);
          newBoard =down();
          animateTile(board, newBoard, 'down')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('down')
                e.classList.remove('Animatied')
              })
              setBoard(moveDown())
            } , 300);
          }
          break;
        case 'ArrowLeft':
          isGameOver(copyBoard);
          newBoard = left();
          animateTile(board, newBoard, 'left')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('left')
                e.classList.remove('Animatied')
              })
              setBoard(moveLeft())
            } , 300);
          }
          break;
        default:
          break;
      }
    }

  useEffect(() => {
    if (gameWin){
      return
    }
    window.addEventListener('keyup', keyHandler)
    return () => window.removeEventListener('keyup', keyHandler)
  });

  useEffect(() => {
    window.addEventListener('touchmove', touchHandlerMove)
    window.addEventListener('touchend', touchHandlerEnd)

    return() => {
      window.removeEventListener('touchmove', touchHandlerMove)
      window.removeEventListener('touchend', touchHandlerEnd)

    }
  })

  let x;
  let y;
  let direction = null
  
  const touchHandlerMove = (e) => {
    if (x && y) {
      const xDiff = x - e.touches[0].pageX;
      const yDiff = y - e.touches[0].pageY;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          direction = 'left'
        } else {
          direction = 'right'
        }
      } else {
        if (yDiff > 0) {
          direction = 'top'
        } else {
          direction = 'down'
        }
      }
    }
    x = e.touches[0].pageX
    y = e.touches[0].pageY
  }

  const touchHandlerEnd = () => {
    const copyBoard = [...board]
    let newBoard;
    switch (direction) {
      case 'top':
        isGameOver(copyBoard);
          newBoard =up();
          animateTile(board, newBoard, 'up')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('up')
                e.classList.remove('Animatied')
              })
              setBoard(moveUp())
            } , 300);
          }
        break;
      case 'right':
        isGameOver(copyBoard);
          newBoard = right();
          animateTile(board, newBoard, 'right')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('right')
                e.classList.remove('Animatied')
              })
              setBoard(moveRight())
            } , 300);
          }
        break;
      case 'down':
        isGameOver(copyBoard);
          newBoard = down();
          animateTile(board, newBoard, 'down')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('down')
                e.classList.remove('Animatied')
              })
              setBoard(moveDown())
            } , 300);
          }
        break;
      case 'left':
        isGameOver(copyBoard);
          newBoard = left();
          animateTile(board, newBoard, 'left')
          if (!boardsSame(board, newBoard)) {
            setTimeout(() =>{
              document.querySelectorAll('.Animatied').forEach(e => {
                e.classList.remove('left')
                e.classList.remove('Animatied')
              })
              setBoard(moveLeft())
            } , 300);
          }
        break;
      default:
        break;
    }
    x = null;
    y = null;
  }

  return (
    <div className="App">
      {!startGame ? <StartGameScr func={restart}/> : null}
      {gameWin ? <GameWinScr func={restart}/> : null}
      {gameOver ? <GameOverScr func={restart}/> : null}
      <div className='GameField'>
        2048
      {board.map((element, index) => {
        return(
          <Tiles arr={element} xIndex={index}/>
        )
      })
      }
      <div className='RestartButton' onClick={restart}>⟳</div>
      </div>
    </div>
  );
}

export default App;