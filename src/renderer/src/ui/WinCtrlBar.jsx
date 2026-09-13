import classNames from 'classnames'
function WinCtrlBar() {
  return (
    <>
      <button
        id="close-btn"
        className="winCtrl-btn border-0"
        onClick={() => window.api.send('close-window')}
      >
        <i className="bi bi-x-lg" />
      </button>
      <button
        id="max-btn"
        className="winCtrl-btn border-0"
        onClick={() => window.api.send('maximize-window')}
      >
        <i className="bi bi-app" />
      </button>
      <button
        id="min-btn"
        className="winCtrl-btn border-0"
        onClick={() => window.api.send('minimize-window')}
      >
        <i className="bi bi-dash-lg" />
      </button>
      <div className={classNames('m-1', 'flex-fill', 'd-flex', 'align-items-center')}>
        <p className="ms-1 mb-0">My Electronic Mate</p>
      </div>
    </>
  )
}

export default WinCtrlBar
