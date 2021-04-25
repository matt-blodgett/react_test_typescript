import React, { ReactElement } from 'react';
import './TicTacToe.css';

// ----------------------------------------
// functions
function calculateWinner (squares: Array<string>): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ----------------------------------------
// Square
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
  render (): ReactElement {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  };
}

// ----------------------------------------
// Board
type BoardProps = {
  onClick: Function,
  squares: Array<string>,
  value?: string
}
type BoardState = {

}
class Board extends React.Component<BoardProps, BoardState> {
  constructor (props: BoardProps) {
    super(props);
  }

  renderSquare (i: number): ReactElement {
    return (
      <Square
        onClick={() => this.props.onClick(i)}
        value={this.props.squares[i]}
      />
    );
  }

  render (): ReactElement {
    return (
      <div>
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
    );
  }
}

// ----------------------------------------
// Game
type GameTicTacToeProps = {

}
type GameTicTacToeState = {
  history: Array<{squares: Array<string>}>,
  stepNumber: number,
  xIsNext: boolean
}
class GameTicTacToe extends React.Component<GameTicTacToeProps, GameTicTacToeState> {
  constructor (props: GameTicTacToeProps) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill('') }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick (i: number): void {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo (step: number): void {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render (): ReactElement {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status = '';
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${(this.state.xIsNext ? 'X' : 'O')}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ----------------------------------------
// exports
export default GameTicTacToe;
