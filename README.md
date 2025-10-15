# Bitespeed - Visual Flow Builder

A modern React application for creating and managing visual node-based flows using ReactFlow. This application allows users to create, connect, and manage different types of nodes in a drag-and-drop interface.

## 🚀 Features

- **Visual Flow Builder**: Create flows using drag-and-drop nodes
- **Node Connections**: Connect nodes with validation rules
- **Text Nodes**: Editable text nodes with custom styling
- **Side Panel**: Node management and editing interface
- **Save Functionality**: Validate and save flows with error handling
- **Responsive Design**: Built with Material-UI for modern interface

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **ReactFlow (@xyflow/react)** - Flow diagram library
- **Material-UI** - Component library
- **ESLint** - Code linting

## 📋 Prerequisites

### Node.js Version

This project requires **Node.js v22.20.0**. We use `.nvmrc` for version management.

```bash
# Check if you have the correct Node version
node --version

# If using nvm, switch to the project's Node version
nvm use
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bitespeed
```

### 2. Use Correct Node Version

```bash
# Switch to the required Node.js version
nvm use
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Commands

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build production bundle          |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint for code quality      |

## 📁 Project Structure

```
bitespeed/
├── .nvmrc                    # Node.js version specification
├── README.md                 # Project documentation
├── package.json              # Project dependencies and scripts
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── public/                  # Static assets
└── src/
    ├── main.jsx            # Application entry point
    ├── App.jsx             # Main App component
    ├── App.css             # Global styles
    ├── index.css           # Root styles
    ├── assets/             # Static assets (images, fonts, etc.)
    ├── Components/         # Reusable components
    │   ├── index.js        # Component exports
    │   ├── SidePanel.jsx   # Side panel for node management
    │   └── react_flow/     # ReactFlow specific components
    │       ├── nodeTypes.js
    │       ├── TextNodeWrapper.jsx
    │       └── Nodes/
    │           └── TextNode.jsx
    ├── Constants/          # Application constants
    │   └── common.js
    ├── Pages/              # Page components
    │   └── Home.jsx        # Main application page
    ├── Provider/           # Context providers
    │   └── DnDContext.jsx  # Drag and drop context
    └── ui/                 # UI utilities
        └── theme.js        # Theme configuration
```

## 🔧 Configuration Files

- **`.nvmrc`** - Specifies Node.js version (v22.20.0)
- **`vite.config.js`** - Vite build tool configuration
- **`eslint.config.js`** - ESLint rules and configuration
- **`package.json`** - Project metadata and dependencies

## 💡 Best Practices

### Development

- **Node Version**: Always use the specified Node.js version in `.nvmrc`
- **Code Quality**: Run `npm run lint` before committing changes
- **Component Structure**: Keep components small and focused on single responsibility
- **File Naming**: Use PascalCase for component files (e.g., `SidePanel.jsx`)

### Git Workflow

```bash
# Before starting work
nvm use
npm install

# Before committing
npm run lint
npm run build  # Ensure build works
```

### Performance

- **Code Splitting**: Components are organized by feature/responsibility
- **Lazy Loading**: Consider implementing lazy loading for large components
- **Bundle Analysis**: Use `npm run build` to check bundle size

### Accessibility

- Components use Material-UI which provides built-in accessibility features
- Ensure proper ARIA labels for custom components
- Test keyboard navigation

## 🔄 Flow Builder Usage

### Creating Nodes

1. Drag nodes from the side panel onto the canvas
2. Nodes are automatically positioned where dropped
3. Click on nodes to edit their properties

### Connecting Nodes

1. Drag from the right handle (source) of one node
2. Drop on the left handle (target) of another node
3. Each source can only have one outgoing connection
4. Connections are validated before creation

### Saving Flows

1. Click "Save Changes" in the top bar
2. Validation ensures no multiple unconnected start nodes
3. Success/error messages provide feedback

## 🐛 Troubleshooting

### Common Issues

**Node Version Mismatch**

```bash
Error: Node.js version mismatch
Solution: Run `nvm use` to switch to the correct version
```

**ESLint Errors**

```bash
Error: ESLint configuration issues
Solution: Run `npm run lint` to see specific issues
```

**Build Failures**

```bash
Error: Build fails
Solution: Ensure all dependencies are installed with `npm install`
```

## 🤝 Contributing

1. Follow the established folder structure
2. Use the project's Node.js version (`.nvmrc`)
3. Run linting before submitting changes
4. Follow React and JavaScript best practices
5. Write meaningful commit messages

## 📄 License

This project is private and proprietary.
