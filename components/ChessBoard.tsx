import React from 'react'
import { Chess } from 'chess.js'

interface ChessBoardProps {
  position: string
  onSquareClick: (square: string) => void
  selectedSquare: string | null
  validMoves: string[]
}

const PIECE_SYMBOLS = {
  'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
  'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
}

export default function ChessBoard({ position, onSquareClick, selectedSquare, validMoves }: ChessBoardProps) {
  const chess = new Chess(position)
  const board = chess.board()

  const renderSquare = (row: number, col: number) => {
    const square = String.fromCharCode(97 + col) + (8 - row)
    const piece = board[row][col]
    const isLight = (row + col) % 2 === 0
    const isSelected = selectedSquare === square
    const isValidMove = validMoves.includes(square)

    let className = `chess-square ${isLight ? 'light' : 'dark'}`
    if (isSelected) className += ' selected'
    if (isValidMove) className += ' valid-move'

    // Chess.js piece object yapısı: { type: 'p', color: 'w' }
    const pieceSymbol = piece ? 
      PIECE_SYMBOLS[(piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase()) as keyof typeof PIECE_SYMBOLS] : null

    return (
      <div
        key={square}
        className={className}
        onClick={() => onSquareClick(square)}
      >
        {pieceSymbol}
      </div>
    )
  }

  return (
    <div className="chess-board-container">
      <div className="chess-board">
        {Array.from({ length: 8 }, (_, rowIndex) =>
          Array.from({ length: 8 }, (_, colIndex) => renderSquare(rowIndex, colIndex))
        )}
      </div>
    </div>
  )
} 