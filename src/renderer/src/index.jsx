import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

const reactRoot = createRoot(document.getElementById('root'))
reactRoot.render(<App />)
