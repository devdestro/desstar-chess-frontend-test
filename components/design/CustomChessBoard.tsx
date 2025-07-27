import React from 'react'
import { Chess } from 'chess.js'

interface CustomChessBoardProps {
  position: string
  onSquareClick: (square: string) => void
  selectedSquare: string | null
  validMoves: string[]
  playerColor?: 'white' | 'black' | null
}

const PIECE_SYMBOLS = {
  'p': 'fas fa-chess-pawn', 'r': 'fas fa-chess-rook', 'n': 'fas fa-chess-knight', 
  'b': 'fas fa-chess-bishop', 'q': 'fas fa-chess-queen', 'k': 'fas fa-chess-king',
  'P': 'fas fa-chess-pawn', 'R': 'fas fa-chess-rook', 'N': 'fas fa-chess-knight', 
  'B': 'fas fa-chess-bishop', 'Q': 'fas fa-chess-queen', 'K': 'fas fa-chess-king'
}

export default function CustomChessBoard({ position, onSquareClick, selectedSquare, validMoves, playerColor }: CustomChessBoardProps) {
  const chess = new Chess(position)
  const board = chess.board()
  const isFlipped = playerColor === 'black'

  const renderSquare = (row: number, col: number) => {
    // Siyah oyuncu için koordinatları ters çevir
    const actualRow = isFlipped ? 7 - row : row
    const actualCol = isFlipped ? 7 - col : col
    const square = String.fromCharCode(97 + actualCol) + (8 - actualRow)
    const piece = board[actualRow][actualCol]
    const isLight = (row + col) % 2 === 0
    const isSelected = selectedSquare === square
    const isValidMove = validMoves.includes(square)

    let className = `custom-chess-square ${isLight ? 'light' : 'dark'}`
    if (isSelected) className += ' selected'
    if (isValidMove) className += ' valid-move'
    if (piece) {
      className += piece.color === 'w' ? ' white-piece' : ' black-piece'
    }

    const pieceIconClass = piece ? 
      PIECE_SYMBOLS[(piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase()) as keyof typeof PIECE_SYMBOLS] : null

    return (
      <div
        key={square}
        className={className}
        onClick={() => onSquareClick(square)}
      >
        {pieceIconClass && <i className={pieceIconClass}></i>}
      </div>
    )
  }

  return (
    <div className="custom-chess-container">
      {/* Üst süsleme */}
      <div className="chess-decoration-container">
        <img src="/assets/images/top.svg" alt="Top decoration" />
      </div>
      
      {/* Satranç tahtası container */}
      <div className="chess-board-container">
        <div className="custom-chess-board">
          {/* Orta süsleme - arka plan */}
          <div className="center-decoration">
            <img src="/assets/images/center.svg" alt="Center decoration" />
          </div>
          
          {/* Satranç kareleri */}
          <div className="chess-grid">
            {Array.from({ length: 8 }, (_, rowIndex) =>
              Array.from({ length: 8 }, (_, colIndex) => renderSquare(rowIndex, colIndex))
            )}
          </div>
        </div>
      </div>
      
      {/* Alt süsleme */}
      <div className="chess-decoration-container">
        <img src="/assets/images/bottom.svg" alt="Bottom decoration" />
      </div>
    </div>
  )
} 