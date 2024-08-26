import React from 'react'
import Options from './Options'

function Question({question, dispatch, answer}) {
   // console.log(question)
  return (
    <div>
        <h4> {question.question} </h4>
        {/* based on logical seperation , we are spliting the options as Component. */}
        <Options question ={question} 
        dispatch={dispatch}
        answer={answer}
        />
        
    </div>
  )
}

export default Question