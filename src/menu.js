const { app } = require('electron');
const images = require('./images');
const isMac = process.platform === 'darwin';

module.exports = (mainWindow) => {
    const name = app.getName();
    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
          label: name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }] : []),
        // { role: 'EffectsMenu'}
        {
            label: 'Effects',
            submenu: [
                {
                    label: 'Cycle',
                    accelerator: 'shift+Ctrl+E',
                    click: (menuItem) => {
                        enabledCycleEffect(menuItem.menu.items);
                        mainWindow.webContents.send('effect-cycle');
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Vanilla',
                    type: 'radio',
                    click: () => mainWindow.webContents.send('effect-choose')
                },
                {
                    label: 'Ascii',
                    type: 'radio',
                    click: () => mainWindow.webContents.send('effect-choose', 'ascii')
                },
                {
                    label: 'Daltonize',
                    type: 'radio',
                    click: () => mainWindow.webContents.send('effect-choose', 'daltonize')
                },
                {
                    label: 'Hex',
                    type: 'radio',
                    click: () => mainWindow.webContents.send('effect-choose', 'hex')
                }
            ]
        },
        {
            label: 'View',
            submenu: [{
                label: 'Photos Directory',
                click: () => images.openDir(images.getPicturesDir(app))
            }]
        },
        // { role: 'fileMenu' }
        {
          label: 'File',
          submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
          ]
        },
        // { role: 'editMenu' }
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [
                  { role: 'startspeaking' },
                  { role: 'stopspeaking' }
                ]
              }
            ] : [
              { role: 'delete' },
              { type: 'separator' },
              { role: 'selectAll' }
            ])
          ]
        },
        // { role: 'viewMenu' }
        {
          label: 'View',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
          ]
        },
        // { role: 'windowMenu' }
        {
          label: 'Window',
          submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' }
            ] : [
              { role: 'close' }
            ])
          ]
        }
    ];

    return template;
};

function enabledCycleEffect(items) {
    const nonEffectMenuOffset = 2;
    const selectedIndex = items.findIndex(item => item.checked);
    const nextIndex = selectedIndex + 1 < items.length ? selectedIndex + 1 : nonEffectMenuOffset;
    items[nextIndex].checked = true;
}