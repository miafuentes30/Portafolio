import './Button.css'

function Button({ text, onClick, variant = 'primary', href }) {
  const className = `btn ${variant}`
  if (href) {
    return <a href={href} className={className}>{text}</a>
  }
  return <button className={className} onClick={onClick}>{text}</button>
}

export default Button
