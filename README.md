# Glide Tube Joint Visualizer

A desktop application for visualizing and designing tube joint connections in 3D. Built with React, Three.js, and Electron.

![Glide Tube Joint Visualizer](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![Electron](https://img.shields.io/badge/Electron-39.2.3-47848F)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB)

##  Features

- **3D Visualization**: Interactive 3D environment for tube and joint design
- **Real-time Controls**: Adjust position, rotation, scale, color, and visibility with Leva GUI
- **Smart Joint Detection**: Automatic detection and preview of joint connections when shapes are close
- **Multiple Joint Types**: Support for T-joints, L-joints, Cross-joints, and Corner-joints
- **Desktop Application**: Cross-platform desktop app with native menu and controls

##  Quick Start

### Option 1: Run from Source

#### Prerequisites
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

#### Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/i-ganza007/Glide.git
   cd Glide/vite-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development version**
   ```bash
   npm run electron:dev
   ```

### Option 2: Build Desktop App
To create your own installer:
```bash
npm run electron:dist
```

This creates platform-specific installers in the `release` folder:
- Windows: `Glide Tube Joint Visualizer Setup 1.0.0.exe`
- The app executable in `release/win-unpacked/`

## How to Use

### Basic Controls
- **Mouse**: 
  - Left click + drag: Rotate the camera
  - Right click + drag: Pan the camera
  - Scroll wheel: Zoom in/out

### Adding Shapes
- Use the control panel on the right to add boxes and rectangles
- Adjust properties like position, size, rotation, and color in real-time

### Joint Preview
- Move shapes close to each other to see automatic joint previews
- Different joint types appear based on shape positioning:
  - **T-Joint**: When shapes form a T-shape connection
  - **L-Joint**: When shapes connect at a corner
  - **Cross-Joint**: When shapes intersect perpendicularly
  - **Corner-Joint**: When shapes meet at an angle

### Menu Options
- **File → New Project**: Reset the workspace
- **View → Toggle Dev Tools**: Open developer tools (for debugging)
- **View → Zoom Controls**: Adjust zoom level

##  Development

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run electron:dev` - Start Electron app in development mode
- `npm run electron:start` - Start Electron app with built files
- `npm run electron:pack` - Package the app without installer
- `npm run electron:dist` - Build and create installer

### Project Structure
```
vite-project/
├── src/
│   ├── Components/
│   │   ├── Box.tsx              # 3D box component with controls
│   │   ├── Rectangle.tsx        # 3D rectangle component
│   │   ├── JointHighlight.tsx   # Joint preview visualization
│   │   └── ControlPanel.tsx     # Main control interface
│   ├── meshStore/
│   │   └── meshStore.tsx        # State management for 3D objects
│   ├── utils/
│   │   └── jointDetection.ts    # Joint detection algorithms
│   └── App.tsx                  # Main application component
├── electron.ts                  # Electron main process
├── dist/                        # Built React app (ready for web deployment)
├── dist-electron/              # Built Electron files
└── release/                    # Packaged applications (generated locally)
```

##  Web Deployment

The web version provides the same 3D visualization features without desktop-specific menus at this link below 

https://gliden.netlify.app/

## 🔧 Building for Distribution

### Windows
```bash
npm run electron:dist
```
This creates:
- `release/win-unpacked/` - Unpacked application
- `release/Glide Tube Joint Visualizer Setup 1.0.0.exe` - Windows installer

### macOS
```bash
npm run electron:pack -- --mac
```

### Linux
```bash
npm run electron:pack -- --linux
```

##  Technologies Used

- **Frontend**: React , TypeScript
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Desktop**: Electron 
- **UI Controls**: Leva (GUI controls)
- **State Management**: Zustand
- **Styling**: Tailwind 
- **Build Tool**: Vite

## 📋 System Requirements

- **Windows**: Windows 10 or later
- **macOS**: macOS 10.15 or later
- **Linux**: Ubuntu 18.04 or equivalent
- **RAM**: 4GB minimum, 8GB recommended
- **Graphics**: DirectX 11 compatible or OpenGL 3.3 support


### Getting Help
- Check the [Issues](https://github.com/i-ganza007/Glide/issues) page
- Create a new issue with your problem description and system info

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


