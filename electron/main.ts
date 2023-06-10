import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { CollectionsHandler } from "./CollectionsHandler";
import { Collection, WriteEventPayload } from "./models";

const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
process.env.DIST = path.join(__dirname, "../dist");
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow;
let collectionsHandler: CollectionsHandler;

function createWindow() {
  win = new BrowserWindow({
    height: 800,
    width: 1200,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (!collectionsHandler)
    collectionsHandler = new CollectionsHandler(process.env.PUBLIC);

  ipcMain.on("write-item", (event, payload: WriteEventPayload) => {
    const { action, collection, data } = payload;
    const result = collectionsHandler.write(action, collection, data);
    event.reply(
      "notification",
      result
        ? { message: "Elemento guardado", type: "success" }
        : { message: "Error al guardar", type: "error" }
    );
    event.reply("reply:write-item", result);
  });

  ipcMain.on("get-items", (event, collection: Collection) => {
    const items = collectionsHandler.read(collection);
    event.reply(`reply:${collection}`, items);
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  app.quit();
});

app.whenReady().then(createWindow);
