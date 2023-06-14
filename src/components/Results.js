const ShowResults = ({resultValue, showResult}) => {
    if(showResult){
      return <p>You've {resultValue} questions correct!</p>
    }
    
}

export default ShowResults