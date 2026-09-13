import { Container } from 'react-bootstrap'
import { Toast } from 'react-bootstrap'
import { PropTypes } from 'prop-types'

function AssistantBox({ message }) {
  return (
    <>
      <Container className="d-flex mb-3">
        <Toast className="shadow-none">
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Container>
    </>
  )
}

AssistantBox.propTypes = {
  message: PropTypes.string.isRequired
}

export default AssistantBox
