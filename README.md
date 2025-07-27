# DESSTAR Chess 🏁

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](#)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](#)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white)](#)

**DESSTAR Chess** is a real-time online chess game featuring elegant design, smooth gameplay, and modern web technologies. Create rooms, invite friends, and enjoy chess matches with a beautiful, custom-designed interface.

## ✨ Features

- 🎮 **Real-time Multiplayer** - Play with friends in real-time using Socket.io
- 🎨 **Elegant Design** - Custom chess board with beautiful decorative elements
- 🏠 **Room System** - Create or join rooms with unique codes
- 📱 **Responsive** - Works perfectly on desktop and mobile devices
- ♛ **FontAwesome Pieces** - Beautiful chess pieces with modern icons
- 🎯 **Visual Feedback** - Highlighted moves and selected pieces
- 🔄 **Automatic Perspective** - Board flips for black players
- 🌐 **Open Source** - MIT licensed, free to use and modify

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/desstar/desstar-chess.git
   cd desstar-chess
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Start the development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000` and start playing!

## 🎯 How to Play

1. **Enter your name** in the input field
2. **Create a room** by clicking "Create Room" or **join existing room** with a room code
3. **Share the room code** with your friend
4. **Wait for both players** to join
5. **Host starts the game** when ready
6. **Enjoy your chess match!** ♟️

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with TypeScript
- **React 18** - UI library
- **CSS3** - Custom styling with responsive design
- **Socket.io Client** - Real-time communication
- **FontAwesome** - Chess piece icons
- **Chess.js** - Chess game logic

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Socket.io** - Real-time communication
- **Chess.js** - Game logic validation

### Fonts & Design
- **Italianno** - Decorative font for "chess" text
- **Geist Mono** - Monospace font for UI elements
- **Custom Graphics** - Ornate chess board decorations

## 📁 Project Structure

```
desstar-chess/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Homepage
│   └── room/[roomId]/    # Dynamic room pages
├── components/            # React components
│   └── design/           # Chess board components
├── public/               # Static assets
│   └── assets/           # Images and icons
├── server/               # Backend server
│   ├── index.js         # Socket.io server
│   └── package.json     # Server dependencies
└── README.md            # Project documentation
```

## 🎨 Design Philosophy

DESSTAR Chess combines classical chess with modern web design:

- **Elegant Typography** - Custom fonts for a sophisticated feel
- **Ornate Decorations** - Beautiful SVG borders and decorative elements  
- **Color Harmony** - Consistent color scheme throughout the interface
- **Responsive Layout** - Adaptive design for all screen sizes
- **Smooth Interactions** - Hover effects and transitions for better UX

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Maintain responsive design principles
- Test on both desktop and mobile
- Keep the elegant design consistency
- Add comments for complex logic

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [desstar.shop](https://desstar.shop)
- **Repository**: [GitHub](https://github.com/desstar/desstar-chess)
- **Issues**: [Report Bugs](https://github.com/desstar/desstar-chess/issues)

## 🙏 Acknowledgments

- **Chess.js** - For the robust chess game logic
- **Socket.io** - For seamless real-time communication
- **FontAwesome** - For beautiful chess piece icons
- **Next.js Team** - For the amazing React framework

---

**Made with ♥️ by DESSTAR**

*"Do you want to own this collection in real life? Visit [desstar.shop](https://desstar.shop)."* 