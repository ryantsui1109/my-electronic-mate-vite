/* eslint-disable no-unused-vars */
import { Container } from 'react-bootstrap'
import { Toast } from 'react-bootstrap'
import { CloseButton } from 'react-bootstrap'
import PropTypes from 'prop-types'

// 社課：完成 Userbox
function UserBox({ message, chatIndex, setChatHistory }) {
  return <></>
}

UserBox.propTypes = {
  message: PropTypes.string.isRequired,
  chatIndex: PropTypes.number.isRequired,
  setChatHistory: PropTypes.func.isRequired
}

export default UserBox
