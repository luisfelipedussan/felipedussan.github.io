import { Component } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {
  // Estado del tablero: ' ' para celdas vacías, 'X' y 'O' para los movimientos
  board: string[] = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  gameOver: boolean = false;
  player = 'X';
  ai = 'O';

  constructor() {}

  // Actualiza el tablero con 'X' o 'O' en la celda seleccionada
  handlePlayerMove(index: number): void {
    if (this.board[index] !== ' ' || this.gameOver) return; // Si la celda está ocupada o el juego terminó, no hacer nada
    this.board[index] = this.player; // El jugador pone una 'X'
    this.checkGameStatus(); // Verifica si el juego terminó
    if (!this.gameOver) {
      this.aiMove(); // Si el juego sigue, hace el movimiento de la IA
    }
  }

  // Movimiento de la IA con algoritmo Minimax
  aiMove(): void {
    const bestMove = this.minimax(this.board, this.ai);
    this.board[bestMove.index] = this.ai; // La IA pone una 'O'
    this.checkGameStatus(); // Verifica si el juego terminó
  }

  // Algoritmo Minimax para calcular el mejor movimiento
  minimax(board: string[], currentPlayer: string): { index: number, score: number } {
    const availableCells = this.getAvailableCells(board);

    // Caso base: si hay un ganador o empate
    if (this.checkWinner(board, this.player)) {
      return { index: -1, score: -10 }; // El jugador gana
    } else if (this.checkWinner(board, this.ai)) {
      return { index: -1, score: 10 }; // La IA gana
    } else if (availableCells.length === 0) {
      return { index: -1, score: 0 }; // Empate
    }

    // Recursión: evaluar todos los posibles movimientos
    let bestMove = { index: -1, score: currentPlayer === this.ai ? -Infinity : Infinity };

    for (let i = 0; i < availableCells.length; i++) {
      const index = availableCells[i];
      board[index] = currentPlayer; // Hacer el movimiento
      const score = this.minimax(board, currentPlayer === this.ai ? this.player : this.ai).score; // Evaluar el movimiento
      board[index] = ' '; // Deshacer el movimiento

      if ((currentPlayer === this.ai && score > bestMove.score) || (currentPlayer === this.player && score < bestMove.score)) {
        bestMove = { index, score }; // Actualizar el mejor movimiento
      }
    }

    return bestMove; // Retorna el mejor movimiento encontrado
  }

  // Obtiene las celdas disponibles en el tablero
  getAvailableCells(board: string[]): number[] {
    return board.map((cell, index) => (cell === ' ' ? index : -1)).filter(index => index !== -1);
  }

  checkWinner(board: string[], player: string): boolean {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
      [0, 4, 8], [2, 4, 6] // diagonales
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        return true;
      }
    }
    return false;
  }

  checkGameStatus(): void {
    if (this.checkWinner(this.board, this.player)) {
      this.gameOver = true;
      alert(`${this.player} gana!`);
    } else if (this.checkWinner(this.board, this.ai)) {
      this.gameOver = true;
      alert(`${this.ai} gana!`);
    } else if (this.board.every(cell => cell !== ' ')) {
      this.gameOver = true;
      alert('Empate!');
    }
  }

  resetGame(): void {
    this.board = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.gameOver = false;
  }
}
