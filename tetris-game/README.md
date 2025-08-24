# Tetris Game

A modern, colorful implementation of the classic Tetris puzzle game built with React and TypeScript.

## Features

- 🎮 Full Tetris gameplay with all classic pieces (I, O, T, S, Z, J, L)
- 🎨 Colorful, modern UI with gradient effects and animations
- ⌨️ Keyboard controls (Arrow keys, WASD, Space, P, Enter)
- 📊 Score system with levels and line clearing tracking
- ⏸️ Pause/resume functionality
- 🎯 Progressive difficulty - game speed increases with level
- 📱 Responsive design for desktop and mobile
- 🎪 Next piece preview
- 💫 Smooth animations and visual effects

## Controls

| Key | Action |
|-----|--------|
| ← / A | Move piece left |
| → / D | Move piece right |
| ↓ / S | Soft drop (move down faster) |
| ↑ / W | Rotate piece |
| Space | Hard drop (instant drop) |
| P | Pause/Resume game |
| Enter | Start new game |

## Game Rules

- **Objective**: Clear horizontal lines by filling them completely with blocks
- **Scoring**: 
  - 1 line = 40 × (level + 1) points
  - 2 lines = 100 × (level + 1) points  
  - 3 lines = 300 × (level + 1) points
  - 4 lines (Tetris) = 1200 × (level + 1) points
- **Levels**: Advance one level every 10 lines cleared
- **Speed**: Game speed increases with each level
- **Game Over**: When pieces reach the top of the playing field

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory:
   ```bash
   cd tetris-game
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build/` directory and can be served with any static file server.

## Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # Main game board display
│   ├── GameBoard.css   # Game board styles
│   ├── GameInfo.tsx    # Score, level, and controls display
│   ├── GameInfo.css    # Game info styles
│   ├── NextPiece.tsx   # Next piece preview
│   └── NextPiece.css   # Next piece styles
├── hooks/              # Custom React hooks
│   ├── useGameState.ts # Game state management
│   └── useKeyboardControls.ts # Keyboard input handling
├── types/              # TypeScript type definitions
│   └── gameTypes.ts    # Game-related interfaces and constants
├── utils/              # Utility functions
│   └── gameLogic.ts    # Core Tetris game logic
├── App.tsx             # Main application component
├── App.css             # Global application styles
└── index.tsx           # Application entry point
```

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better development experience
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **Create React App** - Zero-config build setup

## Game Features

### Tetromino Pieces
All 7 classic Tetris pieces are included:
- **I-piece** (Cyan) - The long straight piece
- **O-piece** (Yellow) - The square piece  
- **T-piece** (Purple) - The T-shaped piece
- **S-piece** (Green) - The S-shaped piece
- **Z-piece** (Red) - The Z-shaped piece
- **J-piece** (Blue) - The J-shaped piece
- **L-piece** (Orange) - The L-shaped piece

### Visual Features
- Gradient backgrounds and glowing effects
- Smooth piece animations
- Color-coded pieces with distinct styling
- Modern, game-like UI design
- Responsive layout for different screen sizes

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

### Future Enhancements

Potential features for future development:
- Sound effects and background music
- High score persistence (localStorage)
- Ghost piece (preview where piece will land)
- Hold piece functionality
- Multiplayer support
- Touch controls for mobile devices
- Custom themes and color schemes

## Browser Compatibility

This game works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Modern React features

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Enjoy playing Tetris! 🎮
