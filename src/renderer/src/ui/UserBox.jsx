import { Container } from 'react-bootstrap'
import { Toast } from 'react-bootstrap'
import { CloseButton } from 'react-bootstrap'
import PropTypes from 'prop-types'

function UserBox({ message, chatIndex, setChatHistory }) {
  async function handleDelete() {
    window.api.send('delete-conversation', chatIndex)
    const chatHistory = await window.historyStore.get('chats')
    setChatHistory(chatHistory)
  }

  return (
    <Container className="d-flex justify-content-end mb-3">
      <Toast className="bg-info shadow-none d-flex">
        <Toast.Body className="">{message}</Toast.Body>
        <CloseButton className="me-2 m-auto" onClick={handleDelete}></CloseButton>
      </Toast>
    </Container>
  )
}

UserBox.propTypes = {
  message: PropTypes.string.isRequired,
  chatIndex: PropTypes.number.isRequired,
  setChatHistory: PropTypes.func.isRequired
}

export default UserBox
