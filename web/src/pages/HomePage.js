import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = ({children}) => (
  <section>
    <h1>INICIO</h1>
    <div>
      {children}
    </div>
    <p>Bienvenido a la aplicacion de preguntas y respuestas SofkaU!!</p>
    <Link to="/questions" className="button">
      Ver Preguntas
    </Link>
  
  </section>
)
export default HomePage
