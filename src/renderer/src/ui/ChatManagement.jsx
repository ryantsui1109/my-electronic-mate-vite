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
        return index % 2 ? (
          <AssistantBox key={index} message={value.content} />
        ) : (
          <UserBox
            key={index}
            chatIndex={index}
            message={value.content}
            setChatHistory={setChatHistory}
          />
        )
      })}
    </>
  )
}
export default ChatManagement
