import React from 'react'

const errorStyle = (display) => {
    return {
        color: 'red',
        display: display
    }
}

const InvalidLogInDetails = ({display}) => {
    return (
      <div>
        <p style={errorStyle(display)}>Invalid username/password</p>
      </div>
    )
}

export {
    InvalidLogInDetails
}
