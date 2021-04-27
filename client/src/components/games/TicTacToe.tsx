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
  onMouseOver: () => void,
  onClick: () => void,
  locked: boolean,
  value: string
}
function Square (props: SquareProps) {
  const classes = useStyles();

  return (
    <button
      className={props.locked ? classes.squareLocked : classes.square}
      onMouseOver={() => props.onMouseOver()}
      onClick={() => props.onClick()}
    >{props.value}
    </button>
  );
}

type HoveredCell = {
  cell: number,
  value: string
}
type BoardProps = {
  onMouseOver: (cell: number) => void,
  onClick: (cell: number) => void,
  cellValues: Array<string>,
  cellHovered: HoveredCell | null
}
function Board (props: BoardProps) {

  const renderSquare = (cell: number): ReactElement => {
    let cellLocked = false;
    let cellValue = props.cellValues[cell];

    let currentWinner = checkCurrentWinner(props.cellValues);
    let isBoardFull = checkIsBoardFull(props.cellValues);

    if (cellValue || currentWinner || isBoardFull) {
      cellLocked = true;
    } else {
      let cellHovered = props.cellHovered;
      if (cellHovered) {
        if (cellHovered.cell === cell) {
          cellValue = cellHovered.value;
        }
      }
    }

    return (
      <Square
        onMouseOver={() => props.onMouseOver(cell)}
        onClick={() => props.onClick(cell)}
        locked={cellLocked}
        value={cellValue}
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
  cellHovered: HoveredCell | null,
  gameNumber: number,
  moveNumber: number,
  isNextX: boolean,
  currentPlayer: string,
  currentWinner: string | null,
  isBoardFull: boolean,
  totalWinsX: number,
  totalWinsO: number,
  totalWinsDraws: number
}
const nullGameState = {
  cellValues: Array(9).fill(''),
  cellHovered: null,
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
    }, 25);
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
      cellHovered: null,
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
      cellHovered: null,
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

  const onClickBoard = (cell: number): void => {
    if (gameState.cellValues[cell] || gameState.currentWinner || gameState.isBoardFull) {
      return;
    }

    let cellValues = gameState.cellValues.slice();
    let currentWinner = checkCurrentWinner(cellValues);
    let isBoardFull = checkIsBoardFull(cellValues);
    if (currentWinner || isBoardFull || cellValues[cell]) {
      return;
    }

    cellValues[cell] = gameState.isNextX ? 'X' : 'O';

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

  const onMouseOutBoard = (): void => {
    if (!(gameState.currentWinner || gameState.isBoardFull)) {
      setGameState({
        ...gameState,
        cellHovered: null
      });
    }
  };

  const onMouseOverBoard = (cell: number): void => {
    if (!(gameState.currentWinner || gameState.isBoardFull)) {
      let cellHovered = {
        cell: cell,
        value: gameState.currentPlayer
      };
      setGameState({
        ...gameState,
        cellHovered: cellHovered
      });
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
        <div onMouseOut={() => onMouseOutBoard()}>
          <Board
            onMouseOver={(cell: number) => onMouseOverBoard(cell)}
            onClick={(cell: number) => onClickBoard(cell)}
            cellValues={gameState.cellValues}
            cellHovered={gameState.cellHovered}
          />
          <div className={classes.gameBottom}>
            <div>Game #{gameState.gameNumber}</div>
          </div>
        </div>
        <div className={classes.gameRight}>
          <div className={classes.tableWinsContainer}>
            <table className={classes.tableWins}>
              <thead>
                <tr>
                  <th colSpan={2}>Wins</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={classes.tableWinsCol1}>Player X</td>
                  <td className={classes.tableWinsCol2}>{gameState.totalWinsX}</td>
                </tr>
                <tr>
                  <td className={classes.tableWinsCol1}>Player O</td>
                  <td className={classes.tableWinsCol2}>{gameState.totalWinsO}</td>
                </tr>
                <tr>
                  <td className={classes.tableWinsCol1}>Draws</td>
                  <td className={classes.tableWinsCol2}>{gameState.totalWinsDraws}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
