const Notification = ({ success, error }) => {
  if (success === null && error === null) {
    return null
  }

  return (
    <div className="notification" style={{ color: success ? 'green' : 'red' }}>
      {success}
      {error}
    </div>
  )
}

export default Notification
