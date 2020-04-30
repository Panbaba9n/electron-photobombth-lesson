const { app, BrowserWindow, ipcMain, Menu } = require('electron');

const images = require('./images');
const menuTemplate = require('./menu');

let mainWindow;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // width: 1200, // when using devTools
        width: 893,
        height: 725,
        resizable: false,
    });

    mainWindow.loadURL(`file://${__dirname}/capture.html`);

    // mainWindow.webContents.openDevTools();

    images.mkdir(images.getPicturesDir(app));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow));
    Menu.setApplicationMenu(menuContents);
});

ipcMain.on('image-captured', (evt, contents) => {
    images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
      images.cache(imgPath);  
    });
});

ipcMain.on('image-remove', (evt, index) => {
    images.rm(index, () => {
        evt.sender.send('image-removed', index);
    });
});