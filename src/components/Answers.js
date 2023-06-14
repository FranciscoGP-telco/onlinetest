const ShowAnswers = ({questions, correctAnswers, toggleShowAnswers}) => {
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

export default ShowAnswers