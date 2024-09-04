import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

function Progress() {
  const {index, numQuestion, points, maxPossiblePoints, answer} = useQuiz();
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