import React, {useState} from 'react'
import Question from './Question'

//https://opentdb.com/api.php?amount=5&difficulty=hard&type=multiple

export default function App() {
    
    const [questionsData, setQuestionsData] = useState([])
    const [endGame, setEndGame] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    
    
    React.useEffect(() => {
        if(endGame) {
            let number = questionsData.reduce((prevValue,currValue) => { 
                return currValue.correct_answer===currValue.selectedAnswer ? prevValue + 1 : prevValue
                } , 0)
            //check correct_answer 
            setCorrectAnswers(number)
        }
        
    })
    
    //update questionsData at the selectedAnswer property when one of the answer is clicked
    function setSelectedAnswer(id, answer) {
        // console.log(id)
        setQuestionsData(prevQuestions => prevQuestions.map(question => {
            return question.question === id ? {...question, selectedAnswer: answer} : question
        }))
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    function getQuestions() {
        fetch("https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple")
        .then(res => res.json())
        .then(data => {
            //re-written object structure cameback from api
            setQuestionsData(data.results.map(result => {
                return {
                    question: result.question.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#039;/g, "'"), 
                    possible_answers: shuffleArray([...result.incorrect_answers,result.correct_answer]), 
                    correct_answer: result.correct_answer,
                    selectedAnswer: ""
                    }
                    
            }))
        })
    }
    //now that i have the data
    const displayQuestions = questionsData.map((question)=> (
        
        <Question 
            question={question.question} 
            key={question.question} 
            id={question.question}
            possible_answers={question.possible_answers} 
            setSelectedAnswer={setSelectedAnswer}
            selectedAnswer={question.selectedAnswer}
            />
        
        ) )
    
    return (
        questionsData.length === 0 ?
        <main className="load-screen">
            <h1>Quizzical</h1>
            <p>Click "Start Quiz" to get random questions!</p>
            <button onClick={getQuestions}>Start Quiz</button>
        </main> 
        :
        <main className="main-screen">
            {displayQuestions}
            {!endGame ? 
            <button onClick={()=>setEndGame(true)}>Check answers</button> :
            <footer>
                You scored {correctAnswers}/10 correct answers
                <button onClick={()=>{setEndGame(false);getQuestions()}}>Play again</button>
            </footer>
            }
        </main>
    )
}

// [{category: "Sports", type: "multiple", difficulty: "hard", question: "With which doubles partner did John McEnroe have most success?", correct_answer: "Peter Fleming", incorrect_answers: ["Mark Woodforde", "Michael Stich", "Mary Carillo"]}, {category: "Celebrities", type: "multiple", difficulty: "hard", question: "How tall is Tom Cruise?", correct_answer: "5&prime; 7&Prime;", incorrect_answers: ["5&prime; 9&Prime;", "5&prime; 4&Prime;", "5&prime; 5&Prime;"]}, {category: "Entertainment: Board Games", type: "multiple", difficulty: "hard", question: "Which board game was first released on February 6th, 1935?", correct_answer: "Monopoly", incorrect_answers: ["Risk", "Clue", "Candy Land"]}, {category: "History", type: "multiple", difficulty: "hard", question: "Which of the following was not one of Joseph Stalin&#039;s ten blows during World War II?", correct_answer: "Vistula-Oder Offensive", incorrect_answers: ["Crimean Offensive", "Leningrad-Novgorod Offensive", "Operation Bagration"]}, {category: "Entertainment: Video Games", type: "multiple", difficulty: "hard", question: "What is the name of the main island in PLAYERUNKNOWN&#039;S BATTLEGROUNDS?", correct_answer: "Erangel", incorrect_answers: ["Marmara", "Severny", "Lastovo"]


