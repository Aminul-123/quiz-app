import React from 'react'
import Options from './Options'
import { useQuiz } from '../contexts/QuizContext'

function Question({question}) {
   // console.log(question)
  return (
    <div>
        <h4> {question.question} </h4>
        {/* based on logical seperation , we are spliting the options as Component. */}
        <Options question ={question} 
       
        />
        
    </div>
  )
}

export default Question