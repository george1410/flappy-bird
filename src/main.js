const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let window;

app.on('ready', () => {
    window = new BrowserWindow({width: 400, height: 700, webPreferences: { nodeIntegration: true }, titleBarStyle: 'hidden'});
    window.loadURL(url.format({
        pathname: path.join(__dirname, './app/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // open the devtools on launch
    window.webContents.openDevTools();
});