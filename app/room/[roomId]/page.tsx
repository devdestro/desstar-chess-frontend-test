'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { Chess, Square, Color } from 'chess.js'
import CustomChessBoard from '@/components/design/CustomChessBoard'
import { io, Socket } from 'socket.io-client'

interface Player {
  id: string
  name: string
  color: 'white' | 'black' | null
}

interface GameState {
  fen: string
  currentPlayer: 'white' | 'black'
  players: Player[]
  gameStatus: 'waiting' | 'playing' | 'finished'
  winner?: string
}

export default function RoomPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const roomId = params?.roomId as string
  const playerName = searchParams?.get('name') || 'Anonim'
  const isHost = searchParams?.get('host') === 'true'
  
  const [socket, setSocket] = useState<Socket | null>(null)
  const [game, setGame] = useState(new Chess())
  const [gameState, setGameState] = useState<GameState>({
    fen: new Chess().fen(),
    currentPlayer: 'white',
    players: [],
    gameStatus: 'waiting'
  })
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [validMoves, setValidMoves] = useState<string[]>([])
  
  // Keep-alive mechanism for free hosting
  useEffect(() => {
    const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    if (!isProduction) return
    
         const keepAliveInterval = setInterval(async () => {
       try {
         await fetch('https://desstar-chess-server.onrender.com/ping')
         console.log('🏓 Keep-alive ping sent')
       } catch (error) {
         console.log('❌ Keep-alive ping failed:', error)
       }
     }, 10 * 60 * 1000) // 10 minutes
    
    return () => clearInterval(keepAliveInterval)
  }, [])
  
  useEffect(() => {
    // Production'da HTTPS backend, development'da localhost
    const socketUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
      ? 'https://desstar-chess-server.onrender.com'  // Direkt HTTPS backend
      : `http://${window.location.hostname}:3001`
    
    console.log('Connecting to:', socketUrl)
    
    // Production'da ABSOLUTE URL zorla
    const finalSocketUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
      ? 'https://desstar-chess-server.onrender.com'
      : socketUrl
    
    console.log('Final socket URL:', finalSocketUrl)
    
    const newSocket = io(finalSocketUrl, {
      transports: ['polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      forceNew: true,
      upgrade: false,
      rememberUpgrade: false,
      withCredentials: false,  // CORS için
      extraHeaders: {},
      timeout: 20000
    })
    setSocket(newSocket)

    newSocket.emit('join-room', {
      roomId,
      playerName,
      isHost
    })

    newSocket.on('game-state', (state: GameState) => {
      setGameState(state)
      try {
        const newGame = new Chess(state.fen)
        setGame(newGame)
      } catch (error) {
        console.error('Chess game state error:', error)
        // Reset to initial position if FEN is invalid
        const initialGame = new Chess()
        setGame(initialGame)
        setGameState(prev => ({ ...prev, fen: initialGame.fen() }))
      }
      // Clear moves after game state update
      setSelectedSquare(null)
      setValidMoves([])
    })

    newSocket.on('move-made', (moveData: { fen: string, currentPlayer: 'white' | 'black' }) => {
      try {
      const newGame = new Chess(moveData.fen)
      setGame(newGame)
      setGameState(prev => ({
        ...prev,
        fen: moveData.fen,
        currentPlayer: moveData.currentPlayer
      }))
      } catch (error) {
        console.error('Invalid FEN received:', error)
      }
      setSelectedSquare(null)
      setValidMoves([])
    })

    newSocket.on('player-joined', (players: Player[]) => {
      setGameState(prev => ({ ...prev, players }))
    })

    newSocket.on('game-started', () => {
      setGameState(prev => ({ ...prev, gameStatus: 'playing' }))
    })

    newSocket.on('room-error', ({ message }) => {
      alert(message)
      router.push('/')
    })

    return () => {
      newSocket.disconnect()
    }
  }, [roomId, playerName, isHost])

  const handleSquareClick = (square: string) => {
    if (gameState.gameStatus !== 'playing') {
      return
    }
    
    const currentPlayerData = gameState.players.find(p => p.name === playerName)
    
    if (!currentPlayerData || currentPlayerData.color !== (gameState.currentPlayer === 'white' ? 'white' : 'black')) {
      return
    }

    if (selectedSquare === square) {
      setSelectedSquare(null)
      setValidMoves([])
      return
    }

    const piece = game.get(square as Square)
    
    if (selectedSquare && validMoves.includes(square)) {
      // Make move
      try {
        // Test move locally first to validate
        const testGame = new Chess(game.fen())
        const move = testGame.move({
          from: selectedSquare as Square,
          to: square as Square,
          promotion: 'q'
        })
        
        if (move) {
          socket?.emit('make-move', {
            roomId,
            from: selectedSquare,
            to: square,
            promotion: 'q'
          })
        }
      } catch (error) {
        console.error('Invalid move:', error)
      }
      
      setSelectedSquare(null)
      setValidMoves([])
    } else if (piece && piece.color === (gameState.currentPlayer === 'white' ? 'w' : 'b')) {
      // Select piece
      setSelectedSquare(square)
      try {
        const moves = game.moves({ square: square as Square, verbose: true })
        setValidMoves(moves.map((move: any) => move.to))
      } catch (error) {
        console.error('Could not get valid moves:', error)
        setValidMoves([])
      }
    } else {
      setSelectedSquare(null)
      setValidMoves([])
    }
  }

  const startGame = () => {
    if (gameState.players.length === 2) {
      socket?.emit('start-game', roomId)
    }
  }

  const getCurrentPlayerColor = () => {
    return gameState.players.find(p => p.name === playerName)?.color
  }

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(roomId)
      alert('Room code copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy room code:', err)
      // Fallback: manual copy
      const textArea = document.createElement('textarea')
      textArea.value = roomId
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('Room code copied to clipboard!')
    }
  }



  return (
    <div className="game-container">
                {/* Sol taraf - Satranç Tahtası */}
          <div className="chess-board-section">
            <div className="chess-board-wrapper">
              <CustomChessBoard
                position={game.fen()}
                onSquareClick={handleSquareClick}
                selectedSquare={selectedSquare}
                validMoves={validMoves}
                playerColor={getCurrentPlayerColor()}
              />
            </div>
            {/* Mobil'de tahtanın altındaki elementler */}
            <div className="mobile-quit-section">
              {/* Promotional text */}
              <div className="mobile-promo-text">
                Do you want to own this collection in real life? Visit <a href="https://desstar.shop" target="_blank" rel="noopener noreferrer">desstar.shop</a>.
              </div>
              
              <button className="game-button mobile-quit-button" onClick={() => window.location.href = '/'}>
                Quit Game
              </button>
            </div>
          </div>

      {/* Sağ taraf - Oyun Bilgileri */}
      <div className="game-sidebar">
        {/* Logo */}
                    <div className="game-logo">
              <img src="/assets/images/logo.png" alt="DESSTAR" />
              <hr />
              {/* Desktop'ta promotional text */}
              <div className="desktop-promo-text">
                Do you want to own this collection in real life? Visit <a href="https://desstar.shop" target="_blank" rel="noopener noreferrer">desstar.shop</a>.
              </div>
            </div>

                    {/* Mobil için yan yana kutular */}
            <div className="mobile-top-section">
              {/* Oyuncular */}
              <div className="users-section">
                <h3>Users</h3>
                {gameState.players.map((player, index) => (
                  <div key={index} className="user-item">
                    {player.color === 'white' ? '⚪' : player.color === 'black' ? '⚫' : '🔄'} 
                    <strong>{player.name}</strong>
                    {player.name === playerName && ' (You)'}
                  </div>
                ))}
                {gameState.players.length < 2 && (
                  <div className="user-item">Waiting for player... ({gameState.players.length}/2)</div>
                )}
              </div>

              {/* Oda Kodu */}
              <div className="room-code-section">
                <div>Room Code</div>
                <div className="room-code" onClick={copyRoomCode} style={{ cursor: 'pointer' }}>{roomId}</div>
              </div>
            </div>

        {/* Oyun Durumu */}
        {gameState.gameStatus === 'playing' && (
          <div className="current-player">
            Turn: {gameState.currentPlayer === 'white' ? '⚪ White' : '⚫ Black'}
            {getCurrentPlayerColor() === gameState.currentPlayer && ' (Your turn!)'}
          </div>
        )}

        {/* Sidebar Aksiyonlar */}
        <div className="game-actions">
          {gameState.gameStatus === 'waiting' && gameState.players.length === 2 && isHost && (
            <button className="game-button" onClick={startGame}>
              Start Game
            </button>
          )}
          
          {gameState.gameStatus === 'waiting' && !isHost && gameState.players.length === 2 && (
            <div style={{ 
              textAlign: 'left', 
              color: 'white', 
              padding: '10px', 
              border: '1px solid #FFF',
              background: 'rgba(0, 0, 0, 0.28)',
              width: '100%',
              boxSizing: 'border-box',
              fontFamily: 'Geist Mono, monospace'
            }}>
              Waiting for host to start...
            </div>
          )}

          {/* Desktop'ta quit game sidebar'da kalacak */}
          <button className="game-button desktop-quit-button" onClick={() => window.location.href = '/'}>
            Quit Game
          </button>
        </div>

        {/* Oyun Mesajları */}
        {game.isCheckmate() && (
          <div className="game-message">
            <h2>🎉 Checkmate! 🎉</h2>
            <p>Winner: {game.turn() === 'w' ? 'Black' : 'White'}</p>
          </div>
        )}

        {game.isCheck() && !game.isCheckmate() && (
          <div className="game-message">
            <h3>⚠️ Check! ⚠️</h3>
          </div>
        )}
      </div>
    </div>
  )
} 