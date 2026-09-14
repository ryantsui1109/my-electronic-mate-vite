import WinCtrlBar from './ui/WinCtrlBar.jsx'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './styles/index.css'
import 'overlayscrollbars/overlayscrollbars.css'
import cn from 'classnames'
import ConfigTabs from './ui/ConfigTabs.jsx'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

function App() {
  return (
    <>
      <WinCtrlBar></WinCtrlBar>
      <OverlayScrollbarsComponent id="app-body">
        <Container className="w-100">
          <ConfigTabs />
        </Container>
      </OverlayScrollbarsComponent>
    </>
  )
}

export default App
