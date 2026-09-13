import { Nav, Tab } from 'react-bootstrap'
import CharacterInfo from './CharacterInfo'
import AppConfig from './AppConfig'
import ChatManagement from './ChatManagement'
function ConfigTabs() {
  return (
    <>
      <Tab.Container defaultActiveKey="appConfig">
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="appConfig">App設定</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="characterInfo">角色設定</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="chatManagement">對話管理</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="appConfig">
            <AppConfig />
          </Tab.Pane>
          <Tab.Pane eventKey="characterInfo">
            <CharacterInfo />
          </Tab.Pane>
          <Tab.Pane eventKey="chatManagement">
            <ChatManagement />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  )
}

export default ConfigTabs
