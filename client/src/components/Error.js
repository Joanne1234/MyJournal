import React from 'react'
import ReAuth from './ReAuth'

const errorStyle = (display) => {
    return {
        color: 'red',
        display: display,
        fontSize: "smaller",
    }
}

const ErrorMessage = ({msg, display}) => {
    msg = msg.replace(/\"/g, "")
    return (
      <div>
        <p style={errorStyle(display)}>{msg}</p>
      </div>
    )
}

export default ErrorMessage

