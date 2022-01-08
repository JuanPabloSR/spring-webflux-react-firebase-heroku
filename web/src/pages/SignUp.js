import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

export default class SignUp extends Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null,
        email: '',
        password: '',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    async handleSubmit(event) {
      event.preventDefault();
      this.setState({ error: '' });
      try {
        await signup(this.state.email, this.state.password);
      } catch (error) {
        this.setState({ error: error.message });
      }
    }

    render() {
        return (
          <section>
            <div>
              <form onSubmit={this.handleSubmit}>
                <h1>
                  Suscribirse
                </h1>
                <p>Rellene el siguiente formulario para crear una cuenta.</p>
                <div>
                  <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
                </div>
                <div>
                  <input placeholder="Contraseña" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
                </div>
                <div>
                  {this.state.error ? <p>{this.state.error}</p> : null}
                  <button type="submit">Registrate</button>
                </div>
                <hr></hr>
                <p>Ya tienes una cuenta? <Link to="/login">Ingresar</Link></p>
              </form>
            </div>
          </section>
          
        )
    }
}