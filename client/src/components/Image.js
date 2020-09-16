import React from 'react'

const Image = ({src, alt, width, height, style}) => {
    return (
      <div>
        <img 
          src={src} 
          alt={alt}
          width={width}
          height={height}
          style={style}
        />
      </div>
    )
}

export default Image
