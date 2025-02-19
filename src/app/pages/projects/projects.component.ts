import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  private readonly EMPTY_CELL = ' ';
  private readonly WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns 
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  board: string[] = Array(9).fill(this.EMPTY_CELL);
  gameOver = false;
  readonly player = 'X';
  readonly ai = 'O';

  handlePlayerMove(index: number): void {
    if (this.board[index] !== this.EMPTY_CELL || this.gameOver) return;
    
    this.makeMove(index, this.player);
    if (!this.gameOver) {
      this.aiMove();
    }
  }

  private makeMove(index: number, currentPlayer: string): void {
    this.board[index] = currentPlayer;
    this.checkGameStatus();
  }

  private aiMove(): void {
    const bestMove = this.minimax(this.board, this.ai);
    this.makeMove(bestMove.index, this.ai);
  }

  private minimax(board: string[], currentPlayer: string): { index: number, score: number } {
    const availableCells = this.getAvailableCells(board);

    if (this.checkWinner(board, this.player)) return { index: -1, score: -10 };
    if (this.checkWinner(board, this.ai)) return { index: -1, score: 10 };
    if (availableCells.length === 0) return { index: -1, score: 0 };

    const moves = availableCells.map(index => {
      board[index] = currentPlayer;
      const score = this.minimax(board, currentPlayer === this.ai ? this.player : this.ai).score;
      board[index] = this.EMPTY_CELL;
      return { index, score };
    });

    return currentPlayer === this.ai 
      ? moves.reduce((best, move) => move.score > best.score ? move : best)
      : moves.reduce((best, move) => move.score < best.score ? move : best);
  }

  private getAvailableCells(board: string[]): number[] {
    return board
      .map((cell, index) => cell === this.EMPTY_CELL ? index : -1)
      .filter(index => index !== -1);
  }

  private checkWinner(board: string[], player: string): boolean {
    return this.WINNING_COMBINATIONS.some(([a, b, c]) => 
      board[a] === player && board[b] === player && board[c] === player
    );
  }

  private checkGameStatus(): void {
    if (this.checkWinner(this.board, this.player)) {
      this.endGame(`${this.player} gana!`);
    } else if (this.checkWinner(this.board, this.ai)) {
      this.endGame(`${this.ai} gana!`);
    } else if (!this.board.includes(this.EMPTY_CELL)) {
      this.endGame('Empate!');
    }
  }

  private endGame(message: string): void {
    this.gameOver = true;
    alert(message);
  }

  resetGame(): void {
    this.board = Array(9).fill(this.EMPTY_CELL);
    this.gameOver = false;
  }
}
