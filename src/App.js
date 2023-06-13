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


const CheckResultButton = (props) => (
  <button onClick={props.handleClick}>
    holaaa2
  </button>
)

const Results = ({resultValue}) => {
  return <p>You've {resultValue} questions correct!</p>
}

function App() {
  const [questions, setQuestions] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState(null)
  const [userAnswers, setUserAnswers] = useState([])
  const [result, setResult] = useState(0)


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
  }


  return (
    <div>
      <Header />
      <ShowQuestions questions={questions} onValueChange={onValueChange}/>
      <CheckResultButton handleClick={() => checkResult()} />
      <Results resultValue={result}/>
    </div>
  );
}

export default App;
