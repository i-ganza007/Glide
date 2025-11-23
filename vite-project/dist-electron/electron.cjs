"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { app, BrowserWindow, Menu } = require('electron');
const { join } = require('path');
// More reliable development detection
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
let mainWindow = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        autoHideMenuBar: true,
        title: 'Glide Tube Joint Visualizer',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
        },
    });
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'New Project',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow?.webContents.reload();
                    }
                },
                { type: 'separator' },
                {
                    label: 'Exit',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    let startURL;
    if (isDev) {
        startURL = 'http://localhost:5173';
    }
    else {
        // In production/packaged app, load from the dist folder
        // When packaged, files are inside app.asar so we use the original path
        startURL = `file://${join(__dirname, '../dist/index.html')}`;
    }
    console.log('Loading URL:', startURL);
    console.log('isDev:', isDev);
    console.log('isPackaged:', app.isPackaged);
    console.log('__dirname:', __dirname);
    mainWindow.loadURL(startURL);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}
app.whenReady().then(() => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
