import React, { ReactElement } from 'react';
import './TicTacToe.css';

// ----------------------------------------
const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
Object.freeze(WINNING_LINES);

// ----------------------------------------
function checkWinner (squareValues: Array<string>): string | null {
  for (let line of WINNING_LINES) {
    const [a, b, c] = line;
    if (squareValues[a] && squareValues[a] === squareValues[b] && squareValues[a] === squareValues[c]) {
      return squareValues[a];
    }
  }
  return null;
}

function checkBoardFull (squareValues: Array<string>): boolean {
  for (let cell = 0; cell <= 8; cell++) {
    if (!['X', 'O'].includes(squareValues[cell])) {
      return false;
    }
  }
  return true;
}

// ----------------------------------------
type SquareProps = {
  onClick: Function,
  value: string
}
type SquareState = {

}
class Square extends React.Component<SquareProps, SquareState> {
  constructor (props: SquareProps) {
    super(props);
  }

  render () {
    return (
      <>
        <button className="square" onClick={() => this.props.onClick()}>{this.props.value}</button>
      </>
    );
  };
}

// ----------------------------------------
type BoardProps = {
  onClick: Function,
  squareValues: Array<string>
}
type BoardState = {

}
class Board extends React.Component<BoardProps, BoardState> {
  constructor (props: BoardProps) {
    super(props);
  }

  renderSquare (i: number): ReactElement {
    return (
      <>
        <Square
          onClick={() => this.props.onClick(i)}
          value={this.props.squareValues[i]}
        />
      </>
    );
  }

  render () {
    return (
      <>
        <div className="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </>
    );
  }
}

// ----------------------------------------
type GameTicTacToeProps = {

}
type GameTicTacToeState = {
  history: Array<{squareValues: Array<string>}>,
  gameNumber: number,
  moveNumber: number,
  isNextX: boolean,
  wins: {
    X: number,
    O: number,
    draws: number
  }
}
class GameTicTacToe extends React.Component<GameTicTacToeProps, GameTicTacToeState> {
  refGameAlert: React.RefObject<HTMLDivElement>;
  constructor (props: GameTicTacToeProps) {
    super(props);
    this.state = {
      history: [
        {
          squareValues: Array(9).fill('')
        }
      ],
      gameNumber: 1,
      moveNumber: 0,
      isNextX: true,
      wins: {
        X: 0,
        O: 0,
        draws: 0
      }
    };

    this.refGameAlert = React.createRef();
  }

  showGameAlert (message: string): void {
    let div = this.refGameAlert.current;
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
  }

  hideGameAlert (): void {
    let div = this.refGameAlert.current;
    if (div) {
      div.style.display = 'none';
      div.style.opacity = '0';
      div.textContent = '';
    }
  }

  newGame (): void {
    this.hideGameAlert();
    this.setState({
      history: [
        {
          squareValues: Array(9).fill('')
        }
      ],
      gameNumber: this.state.gameNumber + 1,
      moveNumber: 0,
      isNextX: true,
      wins: {
        X: 0,
        O: 0,
        draws: 0
      }
    });
  }

  resetBoard (): void {
    this.hideGameAlert();
    this.setState({
      history: [
        {
          squareValues: Array(9).fill('')
        }
      ],
      gameNumber: 1,
      moveNumber: 0,
      isNextX: true,
      wins: {
        X: 0,
        O: 0,
        draws: 0
      }
    });
  }

  handleClick (i: number): void {
    const historyState = this.state.history.slice(0, this.state.moveNumber + 1);
    const currentState = historyState[historyState.length - 1];
    const squareValues = currentState.squareValues.slice();

    let currentWinner = checkWinner(squareValues);
    let isBoardFull = checkBoardFull(squareValues);
    if (currentWinner || isBoardFull || squareValues[i]) {
      return;
    }

    squareValues[i] = this.state.isNextX ? 'X' : 'O';

    this.setState({
      history: historyState.concat([
        {
          squareValues: squareValues
        }
      ]),
      moveNumber: historyState.length,
      isNextX: !this.state.isNextX
    });

    currentWinner = checkWinner(squareValues);
    isBoardFull = checkBoardFull(squareValues);
    if (currentWinner || isBoardFull) {
      this.setState({
        wins: {
          X: this.state.wins.X + (currentWinner === 'X' ? 1 : 0),
          O: this.state.wins.O + (currentWinner === 'O' ? 1 : 0),
          draws: this.state.wins.draws + (isBoardFull ? 1 : 0)
        }
      });
    }
  }

  test (): void {
    console.log('test');
    let div = this.refGameAlert.current;
    if (div) {
      console.log(this.refGameAlert);
    }
  }

  render () {
    const historyState = this.state.history;
    const currentState = historyState[this.state.moveNumber];
    const currentPlayer = this.state.isNextX ? 'X' : 'O';
    const currentWinner = checkWinner(currentState.squareValues);
    const isBoardFull = checkBoardFull(currentState.squareValues);

    if (currentWinner || isBoardFull) {
      let message = '';
      if (!currentWinner && isBoardFull) {
        message = 'Draw!';
      } else {
        message = `Player ${currentWinner} wins!`;
      }
      this.showGameAlert(message);
    }

    return (
      <>
        <div className="game-parent">
          <h1>Tic Tac Toe</h1>
          <div className="game-alert" ref={this.refGameAlert} />
          <div className="game-container">
            <div className="game-left">
              <div className="game-buttons">
                <button className="button-game button-new" onClick={() => this.newGame()}>New Game</button>
                <button className="button-game button-reset" onClick={() => this.resetBoard()}>Reset Board</button>
                <button className="button-game button-test" onClick={() => this.test()}>Test</button>
              </div>
            </div>
            <div className="game-board">
              <Board
                squareValues={currentState.squareValues}
                onClick={(i: number) => this.handleClick(i)}
              />
              <div className="game-bottom">
                <div>{currentWinner || isBoardFull ? '' : `Current player: ${currentPlayer}`}</div>
              </div>
            </div>
            <div className="game-right">
              <div>
                <table className="table-game">
                  <thead>
                    <tr>
                      <th colSpan={2}>Game</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Game</td>
                      <td>{this.state.gameNumber}</td>
                    </tr>
                    <tr>
                      <td>Move</td>
                      <td>{this.state.moveNumber}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table-wins">
                  <thead>
                    <tr>
                      <th colSpan={2}>Wins</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Player X</td>
                      <td>{this.state.wins.X}</td>
                    </tr>
                    <tr>
                      <td>Player O</td>
                      <td>{this.state.wins.O}</td>
                    </tr>
                    <tr>
                      <td>Draws</td>
                      <td>{this.state.wins.draws}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// ----------------------------------------
// exports
export default GameTicTacToe;
