import jsonReaderService from './services/jsonreader'
import { useState, useEffect } from 'react';

const Header = () => {
  return <h1>Online Test Generator</h1>
}

const ShowQuestions = ({questions, onValueChange}) => {
  if(questions){
      return(
        <div>
          <form>
            {questions.map(
              question => 
                <>
                  <h2>Question {question.id} </h2>
                  <p>{question.question}</p>
                  {question.replies.map(
                    (reply, index) =>
                      <>
                        <input 
                          type="radio" 
                          id={`answer${question.id}-${index}`} 
                          name={`question-${question.id}`} 
                          value={reply}
                          onChange={() => onValueChange(question.id, index)}
                        /> 
                        <label for={reply}>{reply}</label><br />
                      </>
                  )}
                </>
            )}
          </form>
        </div>
    )
  }
}

const ShowAnswers = ({questions, correctAnswers, toggleShowAnswers}) => {
  console.log(correctAnswers)
  let answer = ''
  if(toggleShowAnswers){
    return(
      <div>
        <form>
          {questions.map(
            question => 
              <>
                <h2>Question {question.id} </h2>
                <p>{question.question}</p>
                {
                  answer = correctAnswers.find(correctAnswer => correctAnswer.id === question.id).answer
                } 
                <p>The correct answer is: </p>
                <p>{question.replies[answer]}</p>
              </>
          )}
        </form>
      </div>
  )
}
}

const ShowButton = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Results = ({resultValue, showResult}) => {
  if(showResult){
    return <p>You've {resultValue} questions correct!</p>
  }
  
}

function App() {
  const [questions, setQuestions] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [result, setResult] = useState(0)
  const [showResult, setShowResult] = useState(null)
  const [toggleShowAnswers, setToggleShowAnswers] = useState(null)

  useEffect(() => {
    jsonReaderService
      .getQuestions()
      .then(questionList => {
        setQuestions(questionList)
      })
      .catch(error => {
        console.log(`Error ${error} loading the questions from the server`)
      })

    jsonReaderService
      .getAnswers()
      .then(answerList => {
        setCorrectAnswers(answerList)
      })
      .catch(error => {
        console.log(`Error ${error} loading the answers from the server`)
      })

  }, [])


  const onValueChange = (questionId, userAnswer) => {
    const userAnswerUpdate = userAnswers
    if(userAnswerUpdate.some((userAnswer) => userAnswer.id === questionId)){
      const userAnswerToUpdate = userAnswers.find(userAnswer => userAnswer.id === questionId)
      userAnswerToUpdate.answer = userAnswer
      userAnswerUpdate.map(userAnswer =>
        userAnswer.id === questionId ? userAnswer : userAnswerToUpdate
      )
    } else {
      const answer = {
        "answer" : userAnswer,
        "id" : questionId
      }
      userAnswerUpdate.push(answer)
    }
    setUserAnswers(userAnswerUpdate)
    console.log(userAnswers)
  }

  const checkResult = () => {
    let calculatedResult = 0
    userAnswers.map(userAnswer => {
      console.log(userAnswer)
      const correctAnswersObject = correctAnswers.find(correctAnswer => correctAnswer.id === userAnswer.id)
      console.log(correctAnswersObject)
      if(userAnswer.answer === correctAnswersObject.answer) {
        console.log("aciertoooo")
        calculatedResult += 1
        console.log(calculatedResult)
      }
    })
    setResult(calculatedResult)
    setShowResult(true)
  }

  const toggleAnswers = () => {
    if(toggleShowAnswers) {
      setToggleShowAnswers(false)
    } else {
      setToggleShowAnswers(true)
    }
  }

  return (
    <div>
      <Header />
      <ShowQuestions questions={questions} onValueChange={onValueChange}/>
      <ShowButton handleClick={() => checkResult()} text='Show Results!' />
      <ShowButton handleClick={() => toggleAnswers()} text='Show Answers!' />
      <Results resultValue={result} showResult={showResult}/>
      <ShowAnswers questions={questions} correctAnswers={correctAnswers} toggleShowAnswers={toggleShowAnswers} />
    </div>
  );
}

export default App;
