import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import st from '../../assets/saijo_takato_cut.png'
import '../styles/mate.css'
import { Form } from 'react-bootstrap'
import { Spinner } from 'react-bootstrap'

import cn from 'classnames'
import { useState, useRef, useEffect } from 'react'

function MateApp() {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showThinking, setShowThinking] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [showDragHandle, setShowDragHandle] = useState(false)
  // 社課 #4：建立AI回覆state
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  const showDialog = isHovered || isFocused

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    function handleResult(res) {
      // 社課 #6：接收到AI回覆時的行爲
    }

    function handleDialogueEnd() {
      setShowThinking(false)

      setTimeout(() => {
        // eslint-disable-next-line no-undef
        setAiResponse('')
        setShowResponse(false)
      }, 6000)
    }

    window.api.handle('dialogue-result', handleResult)
    window.api.handle('dialogue-end', handleDialogueEnd)
    return () => {
      window.api.remove('dialogue-result', handleResult)
      window.api.remove('dialogue-end', handleDialogueEnd)
    }
  }, [])

  function showHandle() {
    setShowDragHandle(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setShowDragHandle(false)
    }, 3000)
  }

  function handleSubmit(e) {
    // 社課 #5：提交行爲

    // 底下不用自己寫
    setShowResponse(true)
    setShowThinking(true)
    e.currentTarget.reset()
    inputRef.current.blur()
  }

  return (
    <>
      <div
        className={cn('position-relative', 'd-inline-block', 'w-100')}
        onMouseEnter={() => {
          setIsHovered(true)
          showHandle()
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-100">
          <img src={st} draggable="false" className="w-100" alt="mate" />
        </div>

        {showResponse && (
          <div
            className={cn(
              'position-absolute',
              'top-0',
              'start-0',
              'w-100',
              'bg-white',
              'p-2',
              'rounded',
              'shadow-sm',
              'z-3'
            )}
          >
            {showThinking && (
              <Spinner
                style={{ height: '1rem', width: '1rem' }}
                animation="grow"
                variant="secondary"
              />
            )}

            {/* 社課 #4：建立AI回覆state，並填在這裏 */}
          </div>
        )}
        <div
          className={cn('position-absolute', 'top-0', 'start-50', 'translate-middle-x')}
          style={{
            WebkitAppRegion: 'drag',
            display: showDragHandle ? 'block' : 'none'
          }}
        >
          <i
            className={cn('bi', 'bi-grip-horizontal', 'text-white')}
            style={{ fontSize: '1.5rem' }}
          ></i>
        </div>

        <div
          style={{
            display: showDialog ? 'block' : 'none'
          }}
          className={cn('position-absolute', 'bottom-0', 'start-0', 'w-100', 'p-2', 'z-3')}
        >
          <Form onSubmit={handleSubmit} className="bg-white p-1 rounded shadow-sm">
            <Form.Control
              ref={inputRef}
              size="sm"
              type="text"
              name="prompt"
              placeholder="與桌寵對話"
              autoComplete="off"
              onFocus={() => {
                setIsFocused(true)
                showHandle()
              }}
              onBlur={() => setIsFocused(false)}
            />
          </Form>
        </div>
      </div>
    </>
  )
}

export default MateApp
