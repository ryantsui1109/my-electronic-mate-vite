/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import AssistantBox from './AssistantBox'
import UserBox from './UserBox'

function ChatManagement() {
  const [chatHistory, setChatHistory] = useState([])
  useEffect(() => {
    async function getChatHistory() {
      const chatHistory = await window.historyStore.get('chats')
      setChatHistory(chatHistory)
    }

    getChatHistory()
  }, [])

  return (
    <>
      {chatHistory.map((value, index) => {
        // 社課：完成對話記錄管理
        return <></>
      })}
    </>
  )
}
export default ChatManagement
