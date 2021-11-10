
import './App.css';
import React,{useEffect, useState} from 'react';
import Tiles from './Titles/Tiles';
import GameOverScr from './GameOver/GameOverScr';

function App() {
  const [gameOver,setGameover] = useState(false)
  const [gameWin,setWin] = useState(false)
  const [board,setBoard] = useState([
    [1024, 1024, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])
  const [renderBoard, setRenderBoard] = useState([
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
    updatedBoard = generateRandom(updatedBoard);
    return updatedBoard
  }

  const moveRight = () => {
    let updatedBoard = right()
    updatedBoard = generateRandom(updatedBoard);
    return updatedBoard
  }

  const moveUp = () => {
    let updatedBoard = up()
    updatedBoard = generateRandom(updatedBoard);
    return updatedBoard
  }

  const moveDown = () => {
    let updatedBoard = down();
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

  const isGameOver = (board) => {
    if (boardsSame(board, moveLeft())) {
      return false;
    }
    if (boardsSame(board, moveRight())) {
      return false;
    }
    if (boardsSame(board, moveUp())) {
      return false;
    }
    if (boardsSame(board, moveDown())) {
      return false;
    }
    setGameover(true)
  };
  
   const keyHandler = (e) => {
     const copyBoard = [...board]
      switch (e.key) {
        case 'ArrowUp':
          if (!boardsSame(board, up())) {
            setBoard(moveUp());
            checkWin(board);
          }
          break;
        case 'ArrowRight':
          if (!boardsSame(board, right())) {
            setBoard(moveRight());
            checkWin(board);
          }
          break;
        case 'ArrowDown':
          if (!boardsSame(board, down())) {
            setBoard(moveDown());
            checkWin(board);
          }
          break;
        case 'ArrowLeft':
          if (!boardsSame(board, left())) {
            setBoard(moveLeft());
            checkWin(board);
          }
          break;
        default:
          break;
      }
    }

  useEffect(() => {
    window.addEventListener('keyup', keyHandler)
    return () => window.removeEventListener('keyup', keyHandler)
  });

  return (
    <div className="App">
      {gameOver ? <GameOverScr/> : 
      board.map(element => {
        return(
          <Tiles arr={element}/>
        )
      })
      }
    </div>
  );
}

export default App;
