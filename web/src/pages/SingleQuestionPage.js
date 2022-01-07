import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestion, increase, decrease } from '../actions/questionActions'



import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'


const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  userId,
}) => {

  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id));
  }, [dispatch, id]);


 const {handleSubmit} = useForm();

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} />
  }

  const onClickDecrease = (answerId, userId, questionId)=> dispatch(decrease(answerId, userId, questionId));
  const onClickIncrease = (answerId, userId, questionId)=> dispatch(increase(answerId, userId, questionId));
 

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <div key={answer.id}>
        <Answer  answer={answer} />
       {userId?(<div>


       <button  className="btn btn-success" disabled={answer.decrease
        .find((userIdVoted) => userId === userIdVoted)} 
        onClick={handleSubmit(()=> onClickDecrease(answer.id, userId, id))}>Aumentar</button>

<i class="bi bi-caret-up-square-fill"></i>
      
        <button className="btn btn-danger mx-3 " disabled={answer.increase
        .find((userIdVoted) => userId === userIdVoted)} 
         onClick={handleSubmit(()=> 
          onClickIncrease(answer.id, userId, id))}>Disminuir</button>
       </div>):(<div></div>)}
        
  
      </div>
    )) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  userId: state.auth.uid
})

export default connect(mapStateToProps)(SingleQuestionPage)