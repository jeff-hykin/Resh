// requirements 
const { app , BrowserWindow } = require('electron')
//require('electron-debug')({showDevTools: true});
var $ = require('jQuery');
const path = require('path')


// globals
let mainWindow

app.on('ready', () => {
    
    mainWindow = new BrowserWindow({titleBarStyle: 'hiddenInset'});
    mainWindow.loadURL(path.join('file://', __dirname, 'index.html'))
    mainWindow.show()

    // open the debugger instantly
    // mainWindow.webContents.openDevTools()
    
    // these are here to try and fix a problem 
    //module.paths.push(path.resolve('node_modules'));
    //module.paths.push(path.resolve('../node_modules'));
    //module.paths.push(path.resolve(__dirname, '..', '..', 'electron', 'node_modules'));
    //module.paths.push(path.resolve(__dirname, '..', '..', 'electron.asar', 'node_modules'));
    //module.paths.push(path.resolve(__dirname, '..', '..', 'app', 'node_modules'));
    //module.paths.push(path.resolve(__dirname, '..', '..', 'app.asar', 'node_modules'));
})


