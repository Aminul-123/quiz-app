import React from 'react'

function Progress({index, numQuestion, points, maxPossiblePoints, answer}) {
  return (
   <header className="progress">
    {/* if answer is not null , then answer will convert into boolean value 1, 
    index + 1, */}
    <progress max={numQuestion} value={index + Number(answer !== null)} />
    <p>Question <strong> {index} </strong> / {numQuestion} </p>

    <p><strong> {points} </strong> / {maxPossiblePoints} </p>
   </header>
  )
}

export default Progress