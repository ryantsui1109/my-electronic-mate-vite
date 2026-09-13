import { useRef, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import '../styles/modelSelectorDropdown.css'

function AppConfig() {
  const formRef = useRef(null)
  const [showPassword, setShowPassword] = useState(false)
  const [availableModels, setAvailableModels] = useState([])

  useEffect(() => {
    async function getAppConfig() {
      const appConfig = await window.appConfig.get()

      Object.entries(appConfig).forEach(([key, value]) => {
        formRef.current.elements[key].value = value || ''
      })
    }

    getAvailableModels()
    getAppConfig()
  }, [])

  async function getAvailableModels() {
    const res = await window.api.invoke('get-available-models')
    setAvailableModels(res)
  }

  function setSelected(key) {
    formRef.current.elements['model'].value = key
  }

  function handleSubmit(e) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const fdObject = Object.fromEntries(fd.entries())

    window.appConfig.set(fdObject)
    getAvailableModels()
  }

  function handleTogglePassword() {
    setShowPassword((prev) => !prev)
  }
  return (
    <>
      <div>
        <Form ref={formRef} id="app-config" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicBaseURL">
            <Form.Label>Base URL</Form.Label>
            <Form.Control placeholder="請填寫 API 網址" name="baseURL" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicApiKey">
            <Form.Label>API key</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="請填寫 API key"
                name="apiKey"
                type={showPassword ? 'text' : 'password'}
              ></Form.Control>
              <Button
                variant="secondary"
                onClick={handleTogglePassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <i className="bi bi-eye-slash" /> : <i className="bi bi-eye" />}
              </Button>
            </InputGroup>
            <Form.Text>透過 Electron SafeStorage 加密後儲存</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicModel">
            <Form.Label>模型</Form.Label>
            <InputGroup>
              <Form.Control placeholder="請填寫模型名稱" name="model" />
              <DropdownButton
                onSelect={(key) => setSelected(key)}
                popperConfig={{
                  modifiers: [
                    {
                      name: 'computeStyles',
                      enabled: false
                    }
                  ]
                }}
              >
                <OverlayScrollbarsComponent
                  defer
                  style={{ maxHeight: '180px' }}
                  options={{
                    scrollbars: {
                      autoHide: 'leave' // 滑鼠移開時自動隱藏滾動條
                    }
                  }}
                >
                  {availableModels.map((value) => {
                    return (
                      <Dropdown.Item key={value} eventKey={value}>
                        {value}
                      </Dropdown.Item>
                    )
                  })}
                </OverlayScrollbarsComponent>
              </DropdownButton>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMaxToken">
            <Form.Label>最大 token 數量</Form.Label>
            <Form.Control placeholder="請填寫最大 token 數" name="maxToken" />
            <Form.Text>超過此上限的對話記錄將被自動裁剪</Form.Text>
          </Form.Group>
        </Form>
      </div>
      <div className="d-flex justify-content-end">
        <Button type="submit" form="app-config">
          儲存
        </Button>
      </div>
    </>
  )
}

export default AppConfig
