import { BrowserWindow } from 'electron'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { is } from '@electron-toolkit/utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function startConfiguration() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'index.js')
    }
  })
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/index.html`)
  } else {
    win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'))
  }
}

export default startConfiguration
