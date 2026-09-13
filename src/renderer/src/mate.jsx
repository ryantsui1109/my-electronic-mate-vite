import { createRoot } from 'react-dom/client'
import MateApp from './mate/MateApp.jsx'

const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

const reactRoot = createRoot(document.getElementById('root'))
reactRoot.render(<MateApp />)
