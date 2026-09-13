// eslint-disable-next-line no-unused-vars
import { app, BrowserWindow, ipcMain, screen, Tray, Menu, nativeImage, safeStorage } from 'electron'
import * as path from 'path'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'
import menu from './menu.js'
import OpenAI from 'openai'
import createPrompt from './prompt.js'

// eslint-disable-next-line no-unused-vars
import takatoIconPath from './assets/saijo_takato_head.png?asset'
import mateconfig from './mateConfig.js'

const configStore = new Store({
  defaults: {
    characterInfo: {
      name: '',
      species: '',
      gender: '',
      selfSetup: '',
      calling: '',
      characterTags: [],
      mouthAddictions: []
    }
  }
})
const historyStore = new Store({
  name: 'chatHistory',
  defaults: { chats: [] }
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

ipcMain.on('close-window', (e) => {
  const webContent = e.sender
  const win = BrowserWindow.fromWebContents(webContent)
  win.close()
})
ipcMain.on('maximize-window', (e) => {
  const webContent = e.sender
  const win = BrowserWindow.fromWebContents(webContent)
  if (win.isMaximized()) {
    win.unmaximize()
  } else {
    win.maximize()
  }
})
ipcMain.on('minimize-window', (e) => {
  const webContent = e.sender
  const win = BrowserWindow.fromWebContents(webContent)
  win.minimize()
})
ipcMain.on('resize', (e) => {
  const webContent = e.sender
  const win = BrowserWindow.fromWebContents(webContent)
  win.setSize(800, 600)
})

ipcMain.handle('history-store-get', async (event, key) => {
  return historyStore.get(key)
})

ipcMain.handle('history-store-set', async (event, key, val) => {
  historyStore.set(key, val)
})

ipcMain.handle('electron-store-get', async (event, key) => {
  return configStore.get(key)
})

ipcMain.handle('electron-store-set', async (event, key, val) => {
  configStore.set(key, val)
})
ipcMain.handle('app-config-get', async () => {
  const appConfig = await readConfig()

  return appConfig
})

async function readConfig() {
  const appConfig = configStore.get('appConfig', {})
  const encryptedApiKey = appConfig.encryptedApiKey || null
  const decryptResult = encryptedApiKey
    ? await safeStorage.decryptStringAsync(Buffer.from(encryptedApiKey.data))
    : ''
  appConfig['apiKey'] = decryptResult.result
  delete appConfig.encryptedApiKey
  if (decryptResult.shouldReEncrypt) {
    writeConfig(appConfig)
  }
  return appConfig
}

async function writeConfig(config) {
  console.log(':', Object.keys(safeStorage))
  const encryptedApiKey = await safeStorage.encryptStringAsync(config.apiKey)
  const appConfig = Object.assign({}, config)
  delete appConfig.apiKey
  appConfig['encryptedApiKey'] = encryptedApiKey
  configStore.set('appConfig', appConfig)
}

ipcMain.handle('app-config-set', async (event, val) => {
  writeConfig(val)
})

function estimateTokens(messages) {
  let total = 0
  for (const msg of messages) {
    total += (msg.content?.length || 0) + 4
  }
  return total
}

function trimHistory(history, maxToken) {
  while (estimateTokens(history) > maxToken && history.length > 2) {
    history.splice(0, 2)
  }
}

ipcMain.on('delete-conversation', (e, index) => {
  const conversationHistory = historyStore.get('chats')
  conversationHistory.splice(index, 2)
  historyStore.set('chats', conversationHistory)
})

ipcMain.handle('get-available-models', async () => {
  const appConfig = await readConfig()

  let ret = []
  try {
    const client = new OpenAI({
      apiKey: appConfig.apiKey,
      baseURL: appConfig.baseURL
    })
    const response = await client.models.list()

    for (const model of response.data) {
      ret.push(model.id)
    }
  } catch {
    /* empty */
  }
  return ret
})

ipcMain.handle('send-dialogue', async (e, prompt) => {
  const appConfig = await readConfig()
  const client = new OpenAI({
    apiKey: appConfig.apiKey,
    baseURL: appConfig.baseURL
  })
  const systemPrompt = createPrompt(configStore.get('characterInfo'))

  const conversationHistory = historyStore.get('chats', [])

  const systemTokenCount = systemPrompt.length + 4
  trimHistory(conversationHistory, appConfig.maxToken - systemTokenCount)

  const instantHistory = [{ role: 'system', content: systemPrompt }, ...conversationHistory]

  instantHistory.push({ role: 'user', content: prompt })
  conversationHistory.push({ role: 'user', content: prompt })

  const stream = await client.chat.completions.create({
    model: appConfig.model,
    messages: instantHistory,
    stream: true,
    temperature: 0.8,
    top_p: 0.9
  })

  let instantReply = ''
  const allWindows = BrowserWindow.getAllWindows()
  const winMate = allWindows.find((win) => win.getTitle() === 'desktop-mate')
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || ''
    instantReply += content
    winMate.webContents.send('dialogue-result', content)
  }

  conversationHistory.push({ role: 'assistant', content: instantReply })
  historyStore.set('chats', conversationHistory)

  winMate.webContents.send('dialogue-end')
  return 0
})

// eslint-disable-next-line no-unused-vars
const startMate = ({ winMate }) => {
  // 自己寫哦 <(￣︶￣)↗[GO!]
}

app.whenReady().then(() => {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize
  //社課：構建托盤

  // 社課：menu用於構建選單選項
  // 社課：需要填寫 menu.js
  // eslint-disable-next-line no-unused-vars
  const contextMenu = Menu.buildFromTemplate(menu)

  // 社課：這是桌寵視窗設定檔
  // 社課：需要填寫 mateconfig.js
  const winMate = new BrowserWindow(
    mateconfig(width, height, path.join(__dirname, '../preload/index.js'))
  )

  if (process.platform === 'darwin') {
    const appMenu = Menu.buildFromTemplate([{ label: app.name, submenu: menu }])
    Menu.setApplicationMenu(appMenu)
  }

  // 社課：startMate函數用於啓動浮動桌寵
  // 社課：完成 startMate函數
  startMate({ winMate })
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) startMate({ winMate })
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
