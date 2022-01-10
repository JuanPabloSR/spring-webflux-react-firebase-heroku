import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchQuestion , increase, decrease} from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import swal from 'sweetalert'
import { deleteAnswer } from '../actions/answerActions'




const SingleQuestionPage = ({
  match,
  dispatch,
  question,
  hasErrors,
  loading,
  redirect,
  userId,
  
}) => {

  const { id } = match.params
  useEffect(() => {
    dispatch(fetchQuestion(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (redirect) {
        dispatch(fetchQuestion(id))
    }
}, [redirect, dispatch, id]);



 const {handleSubmit} = useForm();

  const renderQuestion = () => {
    if (loading.question) return <p>Cargando preguntas...</p>
    if (hasErrors.question) return <p>No se pueden mostrar las preguntas.</p>

    return <Question question={question} />
  }

  const onDelete = (answer) => {
    swal({
        title:"Alerta de Eliminacion",
        text:"¿Esta seguro que quiere eliminar la respuesta?",
        icon:"warning",
        buttons:["No", "Si"]
    }).then(ans =>{
        if (ans) {
            dispatch(deleteAnswer(answer))
            swal({text:"¡La respuesta se ha eliminado ;)!",
                icon:"success"
            })
        }
        if (!ans) {
            swal({text:"¡Evento Cancelado!"})
        }
    })

}



  const onClickDecrease = (answerId, userId, questionId)=> dispatch(decrease(answerId, userId, questionId));
  const onClickIncrease = (answerId, userId, questionId)=> dispatch(increase(answerId, userId, questionId));
 

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => (
      <div key={answer.id}>
        <Answer key={answer.id} answer={answer} userId={userId} onDelete={onDelete} />
        
       {userId?(<div>

       <button  className="btn btn-success" disabled={answer.decrease
        .find((userIdVoted) => userId === userIdVoted)} 
        onClick={handleSubmit(()=> onClickDecrease(answer.id, userId, id))}>Aumentar</button>

      
        <button className="btn btn-danger mx-3 " disabled={answer.increase
        .find((userIdVoted) => userId === userIdVoted)} 
         onClick={handleSubmit(()=> 
          onClickIncrease(answer.id, userId, id))}>Disminuir</button>
       </div>):(<div></div>)}
        
  
      </div>
    )) : <p>¡Respuesta vacía!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Contestar
      </Link>}

      <h2 className='titulo'>Respuestas</h2>
      {renderAnswers()}
    </section>
  )
}

const mapStateToProps = state => ({
  question: state.question.question,
  loading: state.question.loading,
  hasErrors: state.question.hasErrors,
  redirect: state.question.redirect,
  userId: state.auth.uid,
  
})

export default connect(mapStateToProps)(SingleQuestionPage)