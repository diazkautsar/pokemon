import React from 'react'
import Loader from 'react-loader-spinner'

const Gatcha: React.FunctionComponent = () => {
  const [status, setStatus] = React.useState<'success' | 'failed'>(null)
  const [statusVisible, setStatusVisible] = React.useState<boolean>(false)

  React.useEffect(() => {
    const number = Math.floor(Math.random() * 2) + 1
    if (number === 1) {
      setStatus('success')
    } else {
      setStatus('failed')
    }

    setTimeout(() => {
      setStatusVisible(true)
    }, 3250)
  })

  return (
    <div>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //7 secs
      />
      { statusVisible && (
        <div> { status } </div>
      )}
    </div>
  )
}

export default Gatcha