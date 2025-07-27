'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function HomePage() {
  const [roomCode, setRoomCode] = useState('')
  const [playerName, setPlayerName] = useState('')
  const router = useRouter()

  const createRoom = () => {
    if (!playerName.trim()) {
      alert('Please enter your name!')
      return
    }
    const newRoomCode = uuidv4().slice(0, 8).toUpperCase()
    router.push(`/room/${newRoomCode}?name=${encodeURIComponent(playerName)}&host=true`)
  }

  const joinRoom = async () => {
    if (!playerName.trim()) {
      alert('Please enter your name!')
      return
    }
    if (!roomCode.trim()) {
      alert('Please enter room code!')
      return
    }

    // Room code format validation (8 characters, alphanumeric)
    if (roomCode.length !== 8 || !/^[A-Z0-9]+$/.test(roomCode.toUpperCase())) {
      alert('Invalid room code! Room code must be 8 characters long and contain only letters/numbers.')
      return
    }

    router.push(`/room/${roomCode.toUpperCase()}?name=${encodeURIComponent(playerName)}`)
  }

  return (
    <div className="homepage-container">
      <div className="homepage-content">
        {/* Logo */}
        <div className="logo-section">
                      <img
              src="/assets/images/logo.png"
              alt="DESSTAR"
              className="logo-image"
            />
          <div className="chess-title">
            chess
          </div>
        </div>

        {/* Form Area */}
        <div className="form-area">
          {/* Enter a nick input */}
          <input
            type="text"
            className="game-input"
            placeholder="Enter a nick"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />

          {/* Made a room button */}
          <button
            onClick={createRoom}
            className="game-button"
          >
            Create Room
          </button>

          {/* Or text */}
          <div className="or-text">
            or
          </div>

          {/* Join section with name and room code */}
          <input
            type="text"
            className="game-input"
            placeholder="Enter a nick"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />

          {/* Room code input */}
          <input
            type="text"
            className="game-input"
            placeholder="Room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            maxLength={8}
          />

          {/* Join a room button */}
          <button
            onClick={joinRoom}
            className="game-button"
          >
            Join Room
          </button>
        </div>

        {/* Footer */}
        <div className="footer">
          This is an open source project by <a href="https://desstar.shop" target="_blank" rel="noopener noreferrer">DESSTAR</a>, all rights reserved © {new Date().getFullYear()}
        </div>
      </div>
    </div>
  )
} 