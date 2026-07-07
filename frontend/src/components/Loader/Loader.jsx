const Loader = ({ message = 'Loading content…' }) => {
  return (
    <div className="loader">
      <div className="loader__spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default Loader
