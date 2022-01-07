import React from 'react'
import { Link } from 'react-router-dom'
import "../index.css";

export const Question = ({ question, excerpt, onDelete }) => (
  <article className={excerpt ? 'question-excerpt' : 'question'}>
    <h2>{question.question}</h2>
    <p>{question.category}  - <small>{question.type}</small></p>
   
    {onDelete && (
      <button className="button delete" onClick={() => onDelete(question.id)}>ELIMINAR</button>
    )}
    {excerpt && (
      <Link to={`/question/${question.id}`} className="button">
        Ver Pregunta
      </Link>
    )}
  </article>
)
