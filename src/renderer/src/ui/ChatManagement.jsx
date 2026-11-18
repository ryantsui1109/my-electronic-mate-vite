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
      {/* 社課 #10：完成對話記錄管理（取消下方註解，補齊 map 與條件判斷） */}
      {/*
        (
          <AssistantBox key={index} message={value.content} />
        ) : (
          <UserBox
            key={index}
            chatIndex={index}
            message={value.content}
            setChatHistory={setChatHistory}
          />
        )
      */}
    </>
  )
}
export default ChatManagement
