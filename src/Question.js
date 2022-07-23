import React from 'react'

export default function Question(props) {
    
    
    let newString = props.question
    
    // each of the answer when clicked will trigger the function that 
    // update the selectedAnswer property
    // if the id match, it will update the correct place
    
    const displayAnswers = props.possible_answers.map(answer => (
        
            <h4
                style={{backgroundColor: props.selectedAnswer === answer ? "#D6DBF5": ""}}
                className="answer"
                key={answer} 
                id={answer} 
                onClick={()=>props.setSelectedAnswer(props.id, answer)}>
                {answer.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#039;/g, "'")}
            </h4>
            
        
    ))
    
   
    
    return (
        <div>
            <h3>{newString}</h3>
            <div className="answer-container">
            {displayAnswers}
            </div>
        </div>
    )
}