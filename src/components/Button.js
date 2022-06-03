import React from 'react'

const Button = ({key, type, onClick, className, dangerouslySetInnerHTML, children}) => {
  return (
    <button key={key} type={type} onClick={onClick} className={className} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
        {children}
    </button>
  )
}

export default Button