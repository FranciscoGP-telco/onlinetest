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
  
export default ShowQuestions