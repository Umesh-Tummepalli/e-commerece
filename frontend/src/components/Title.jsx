import React from 'react'

const Title = (props) => {
    const {text1,text2}=props
  return (
    <div className="inline-flex gap-2 text-center">
        <p className="text-3xl">{text1}</p>
        <p className="text-3xl font-bold">{text2}</p>
    </div>
  )
}

export default Title
