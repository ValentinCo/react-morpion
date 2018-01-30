import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Reset(props) {
    return (
        <button onClick={props.onClick}>
            Reset</button>
    )
}



function Square(props) {
    return (
        <button className={"square " + (props.value === null ? 'unclicked' : 'clicked ' +
        (props.value === 'X' ? 'clickedX' : 'clickedO'))}  onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            nbCoup: 0,
            pointX: 0,
            pointO: 0,
            matchNul: 0,

        };
    }

    resetScore() {
        this.reset();
        this.setState({
            pointX: 0,
            pointO: 0,
            matchNul: 0,
        })
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        let nbCoup = this.state.nbCoup;
        nbCoup++;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            nbCoup: nbCoup,
        });
    }

    reset(){
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            nbCoup: 0,
        })
    }

    renderSquare(i) {
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
            />
        );
    }

    renderReset() {
        return (
            <Reset
                onClick={() => this.resetScore()}
            />
        );
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
            if (winner === 'X'){
                let pointX = this.state.pointX;
                pointX++;
                this.setState({
                    pointX: pointX,
                })
            }else{
                let pointO = this.state.pointO;
                pointO++;
                this.setState({
                    pointO: pointO,
                })
            }
            this.reset();
        } else if (this.state.nbCoup === 9) {
            status = 'Match Nul';
            let matchNul = this.state.matchNul;
            matchNul++;
            this.setState({
                matchNul: matchNul,
            })
            this.reset();
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <ul>
                <li>Joueur X: {this.state.pointX}</li>
                <li>Joueur O: {this.state.pointO}</li>
                <li>Match nul: {this.state.matchNul}</li>
                </ul>
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
                <div>
                    {this.renderReset()}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
