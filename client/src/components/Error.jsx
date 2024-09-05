import React from 'react'

const Error = (props) => {
  return (
    <>
        <div className="error-msg flex flex-col justify-center items-center gap-2">
            <h1 className='text-4xl font-bold'>{props.title}</h1>
            <h3 className='text-xl'>{props.msg}</h3>
        </div>
    </>
  )
}

export default Error
