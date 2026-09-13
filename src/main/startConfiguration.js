import { BrowserWindow } from 'electron'
import * as path from 'path'
import { fileURLToPath } from 'url'

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
  win.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'))
}

export default startConfiguration
