# Quick Mindmap

A fast and intuitive mind mapping tool focused on keyboard-driven content creation and organization. Built with React and TypeScript, this application allows users to quickly create and organize ideas without the hassle of manual connection drawing.

## Features

- 🚀 **Quick Entry**: Create and edit nodes rapidly using keyboard shortcuts
- 🎯 **Auto-Layout**: Automatic node positioning and connection drawing
- ⌨️ **Keyboard-Centric**: Efficient shortcuts for all common operations
- 📝 **Rich Text Support**: Multi-line text with Shift+Enter
- 🔍 **Zoom Controls**: Mouse wheel zoom and pan functionality
- 📋 **Text Outline**: Side-by-side outline view with automatic numbering
- 💾 **Local Storage**: Save and load mind maps as JSON files

## Keyboard Shortcuts

### Node Navigation & Selection
- **Click**: Select a node
- **Double-click**: Edit node content

### Node Creation & Editing
- **Enter** (when node selected): Create a child node
- **Enter** (when editing): Finish editing
- **Shift + Enter** (when editing): New line within node
- **Delete/Backspace**: Delete selected node and its children (except root)

### View Controls
- **Mouse Wheel**: Zoom in/out
- **Mouse Drag**: Pan the canvas

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/trungdoanhong/Quick-Mind-Map.git
```

2. Install dependencies:
```bash
cd Quick-Mind-Map
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

1. **Start with Root Node**
   - Begin with the central "Main Idea" node
   - Double-click to edit its content

2. **Add New Nodes**
   - Select a node and press Enter to create a child node
   - Start typing immediately to add content
   - Press Enter to finish editing

3. **Organize Content**
   - Use Delete to remove unwanted nodes
   - Drag the canvas to view different parts of your mind map
   - Use mouse wheel to zoom in/out

4. **Save Your Work**
   - Click "Save" to download your mind map as a JSON file
   - Use "Load" to restore a previously saved mind map

## Technical Stack

- **React**: UI framework
- **TypeScript**: Type safety and better development experience
- **Styled Components**: Styling solution
- **HTML5 Canvas**: Rendering and interactions

## Project Structure

```
src/
├── components/
│   ├── MindMap.tsx     # Main canvas component
│   ├── Node.tsx        # Individual node component
│   └── TextOutline.tsx # Outline view component
├── types.ts            # TypeScript interfaces
├── App.tsx            # Main application component
└── index.tsx         # Application entry point
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License. 