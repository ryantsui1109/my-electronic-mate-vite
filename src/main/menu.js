import startConfiguration from './startConfiguration.js'

const menu = [
  { label: 'MEM by ryantsui', enabled: false },
  { type: 'separator' },
  {
    label: 'Open Configuration',
    accelerator: 'CommandOrControl+,',
    click: () => {
      startConfiguration()
    }
  },
  { label: 'Run on startup', type: 'checkbox' },
  { type: 'separator' },
  {
    label: 'Exit',
    role: 'quit'
  }
]
export default menu
