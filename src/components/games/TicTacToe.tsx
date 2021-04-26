import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';

import useStyles from './style';

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
Object.freeze(winningLines);

function checkCurrentWinner (cellValues: Array<string>): string | null {
  for (let line of winningLines) {
    const [a, b, c] = line;
    if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[a] === cellValues[c]) {
      return cellValues[a];
    }
  }
  return null;
}

function checkIsBoardFull (cellValues: Array<string>): boolean {
  for (let cell = 0; cell <= 8; cell++) {
    if (!['X', 'O'].includes(cellValues[cell])) {
      return false;
    }
  }
  return true;
}

type SquareProps = {
  onClick: () => void,
  value: string
}
function Square (props: SquareProps) {
  const classes = useStyles();

  return (
    <button className={classes.square} onClick={() => props.onClick()}>{props.value}</button>
  );
}

type BoardProps = {
  onClick: (i: number) => void,
  cellValues: Array<string>
}
function Board (props: BoardProps) {

  const renderSquare = (i: number): ReactElement => {
    return (
      <Square
        onClick={() => props.onClick(i)}
        value={props.cellValues[i]}
      />
    );
  };

  return (
    <div>
      <div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

type GameState = {
  cellValues: Array<string>,
  gameNumber: number,
  moveNumber: number,
  isNextX: boolean,
  currentPlayer: string,
  currentWinner: null | string,
  isBoardFull: boolean,
  totalWinsX: number,
  totalWinsO: number,
  totalWinsDraws: number
}
const nullGameState = {
  cellValues: Array(9).fill(''),
  gameNumber: 1,
  moveNumber: 0,
  isNextX: true,
  currentPlayer: 'X',
  currentWinner: null,
  isBoardFull: false,
  totalWinsX: 0,
  totalWinsO: 0,
  totalWinsDraws: 0
};
export default function TicTacToe () {
  const classes = useStyles();

  const refGameAlert = React.createRef<HTMLDivElement>();
  const [gameState, setGameState] = React.useState<GameState>(nullGameState);

  const showGameAlert = (message: string): void => {
    let div = refGameAlert.current;
    if (div) {
      div.style.display = 'block';
      div.style.opacity = '0';
      div.textContent = message;
    }
    let fadeEffect = setInterval(() => {
      if (div) {
        let currentOpacity = parseFloat(div.style.opacity);
        if (currentOpacity < 1) {
          div.style.opacity = (currentOpacity + 0.1).toString();
        } else {
          div.style.opacity = '1';
          clearInterval(fadeEffect);
        }
      }
    }, 100);
  };

  const hideGameAlert = (): void => {
    let div = refGameAlert.current;
    if (div) {
      div.style.display = 'none';
      div.style.opacity = '0';
      div.textContent = '';
    }
  };

  const newGame = (): void => {
    hideGameAlert();
    setGameState({
      cellValues: Array(9).fill(''),
      gameNumber: gameState.gameNumber + 1,
      moveNumber: 0,
      isNextX: true,
      currentPlayer: 'X',
      currentWinner: null,
      isBoardFull: false,
      totalWinsX: gameState.totalWinsX,
      totalWinsO: gameState.totalWinsO,
      totalWinsDraws: gameState.totalWinsDraws
    });
  };

  const resetBoard = (): void => {
    hideGameAlert();
    setGameState({
      cellValues: Array(9).fill(''),
      gameNumber: 1,
      moveNumber: 0,
      isNextX: true,
      currentPlayer: 'X',
      currentWinner: null,
      isBoardFull: false,
      totalWinsX: 0,
      totalWinsO: 0,
      totalWinsDraws: 0
    });
  };

  const handleClick = (cell: number): void => {
    if (gameState.cellValues[cell] || gameState.currentWinner || gameState.isBoardFull) {
      return;
    }

    let cellValues = gameState.cellValues.slice();
    let currentWinner = checkCurrentWinner(cellValues);
    let isBoardFull = checkIsBoardFull(cellValues);
    if (currentWinner || isBoardFull || cellValues[cell]) {
      return;
    }

    cellValues[cell] = gameState.isNextX ? 'X' : 'O';;

    setGameState({
      ...gameState,
      cellValues: cellValues,
      moveNumber: gameState.moveNumber + 1,
      isNextX: !gameState.isNextX,
      currentPlayer: !gameState.isNextX ? 'X' : 'O'
    });

    currentWinner = checkCurrentWinner(cellValues);
    isBoardFull = checkIsBoardFull(cellValues);
    if (currentWinner || isBoardFull) {
      if (currentWinner === 'X') {
        setGameState({
          ...gameState,
          cellValues: cellValues,
          currentWinner: currentWinner,
          isBoardFull: isBoardFull,
          totalWinsX: gameState.totalWinsX + 1,
          totalWinsO: gameState.totalWinsO,
          totalWinsDraws: gameState.totalWinsDraws
        });
      } else if (currentWinner === 'O') {
        setGameState({
          ...gameState,
          cellValues: cellValues,
          currentWinner: currentWinner,
          isBoardFull: isBoardFull,
          totalWinsX: gameState.totalWinsX,
          totalWinsO: gameState.totalWinsO + 1,
          totalWinsDraws: gameState.totalWinsDraws
        });
      } else if (isBoardFull) {
        setGameState({
          ...gameState,
          cellValues: cellValues,
          currentWinner: currentWinner,
          isBoardFull: isBoardFull,
          totalWinsX: gameState.totalWinsX,
          totalWinsO: gameState.totalWinsO,
          totalWinsDraws: gameState.totalWinsDraws + 1
        });
      }

      if (!currentWinner && isBoardFull) {
        showGameAlert('Draw!');
      } else {
        showGameAlert(`Player ${currentWinner} wins!`);
      }
    }
  };

  return (
    <div className={classes.gameParent}>
      <h1 className={classes.gameTitle}>Tic Tac Toe</h1>
      <div className={classes.gameAlert} ref={refGameAlert} />
      <div className={classes.gameContainer}>
        <div className={classes.gameLeft}>
          <div className={classes.gameButtons}>
            <Button className={`${classes.buttonGame} ${classes.buttonNew}`} variant="contained" color="primary" onClick={() => newGame()}>New Game</Button>
            <Button className={`${classes.buttonGame} ${classes.buttonReset}`} variant="contained" color="secondary" onClick={() => resetBoard()}>Reset Board</Button>
          </div>
        </div>
        <div>
          <Board
            cellValues={gameState.cellValues}
            onClick={(i: number) => handleClick(i)}
          />
          <div className={classes.gameBottom}>
            <div>{gameState.currentWinner || gameState.isBoardFull ? '' : `Current player: ${gameState.currentPlayer}`}</div>
          </div>
        </div>
        <div className={classes.gameRight}>
          <table className={classes.tableGame}>
            <thead>
              <tr>
                <th colSpan={2}>Game</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Game</td>
                <td>{gameState.gameNumber}</td>
              </tr>
              <tr>
                <td>Move</td>
                <td>{gameState.moveNumber}</td>
              </tr>
            </tbody>
          </table>
          <table className={classes.tableWins}>
            <thead>
              <tr>
                <th colSpan={2}>Wins</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Player X</td>
                <td>{gameState.totalWinsX}</td>
              </tr>
              <tr>
                <td>Player O</td>
                <td>{gameState.totalWinsO}</td>
              </tr>
              <tr>
                <td>Draws</td>
                <td>{gameState.totalWinsDraws}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
