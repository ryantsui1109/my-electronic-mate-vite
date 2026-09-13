import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  send: (channel, args) => ipcRenderer.send(channel, args),
  invoke: (channel, args) => ipcRenderer.invoke(channel, args),
  handle: (channel, callback) => ipcRenderer.on(channel, (event, args) => callback(args)),
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel)
  }
})

contextBridge.exposeInMainWorld('electronStore', {
  get: (key) => ipcRenderer.invoke('electron-store-get', key),
  set: (key, val) => ipcRenderer.invoke('electron-store-set', key, val)
})
contextBridge.exposeInMainWorld('historyStore', {
  get: (key) => ipcRenderer.invoke('history-store-get', key),
  set: (key, val) => ipcRenderer.invoke('history-store-set', key, val)
})
contextBridge.exposeInMainWorld('appConfig', {
  get: () => ipcRenderer.invoke('app-config-get'),
  set: (val) => ipcRenderer.invoke('app-config-set', val)
})
contextBridge.exposeInMainWorld('dialogue', {
  send: (prompt) => ipcRenderer.invoke('send-dialogue', prompt)
})
