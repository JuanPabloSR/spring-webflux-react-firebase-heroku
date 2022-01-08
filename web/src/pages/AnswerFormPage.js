import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../actions/questionActions'
import { connect } from 'react-redux'
import { Question } from '../components/Question'
import { Input } from "../components/Input";

const FormPage = ({ dispatch, loading, redirect, match,hasErrors, question, userId }) => {
    const [content, setContent] = useState('');
    const { id } = match.params;
    const history = useHistory();

    const validateInput = ({answer}) => {
        if(answer.length && answer.length <=500) {
            return true;
        }
        return false;
    }

    const onSubmit = e => {
        e.preventDefault();

        const data = {
            userId,
            questionId:id,
            answer:content
        }
        validateInput(data) && dispatch(postAnswer(data));
    }

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    const renderQuestion = () => {
        if (loading.question) return <p>Cargando Pregunta.</p>
        if (hasErrors.question) return <p>No se puede mostrar la pregunta.</p>

        return <Question question={question} />
    }


    return (
        <section>
            {renderQuestion()}
            <h1 className='titulo'>Nueva Respuesta</h1>

            <form onSubmit={onSubmit}>                <div>
                <label htmlFor="answer">Respuesta</label>
                    <Input id="answer" setContent={setContent} />
                   
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Guardando ...." : "Guardar"
                }</button>
            </form>
        </section>

    );
}

const mapStateToProps = state => ({
    loading: state.question.loading,
    redirect: state.question.redirect,
    question: state.question.question,
    hasErrors: state.question.hasErrors,
    userId: state.auth.uid
})

export default connect(mapStateToProps)(FormPage)