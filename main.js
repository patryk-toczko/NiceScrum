const {electron, app, BrowserWindow, ipcMain} = require('electron');
var mongoose = require("mongoose"),
    $        = require("jquery"),
    User     = require("./models/user.js"),
    Project  = require("./models/project.js"),
    Story    = require("./models/story.js"),
    seedDB   = require("./seeds");

// Make connection to the database server
mongoose.connect('mongodb+srv://patog:1234@nicescrum-gkx1k.mongodb.net/test', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

//seed the database with a few users
//seedDB();

// Enable live reload for Electron
//require('electron-reload')(__dirname, {
//   // Note that the path to electron may vary according to the main file
  //electron: require(`${__dirname}/node_modules/electron`)
//});

// Store main window and login page here
let win, login, project;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 1200, height: 800, show: false});
  
  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/views/index.html`);
  
  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });

  project = new BrowserWindow({width: 1200, height: 800, show: false});

  project.loadURL(`file://${__dirname}/views/project.html`);

  project.on('closed', (event) => {
    event.preventDefault();
    project.hide();
  });

  project.on('close', (event) => {
    event.preventDefault();
    project.hide();
  });
  
  login = new BrowserWindow({width: 325, height:400});
  login.loadURL(`file://${__dirname}/views/login.html`);
  
  login.on('closed', () => {
    login = null;
  });
  
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//When login is successful show the main page and close the login window
ipcMain.on('login-successful', (event, user) => {
  win.show();
  login.hide()
  login = null;

  win.webContents.send('user-logged-in', user);
});

ipcMain.on('get-project-page', (event, aProject) => {
  if(!project){
    project = new BrowserWindow({width: 1200, height: 800, show: false});
    project.loadURL(`file://${__dirname}/views/project.html`);
  }
  
  project.show();

  project.webContents.send('show-project-page', aProject);
});