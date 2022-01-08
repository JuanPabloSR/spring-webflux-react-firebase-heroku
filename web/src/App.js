import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import "firebase/firestore";
import "firebase/auth";  
import { login, logout } from './actions/authActions';

import { PublicNavbar, PrivateNavbar } from './components/Navbar'
import Footer from './components/Footer';
import HomePage from './pages/HomePage'
import SingleQuestionPage from './pages/SingleQuestionPage'
import QuestionsPage from './pages/QuestionsPage'
import QuestionFormPage from './pages/QuestionFormPage'
import AnswerFormPage from './pages/AnswerFormPage'
import OwnerQuestionsPage from './pages/OwnerQuestionsPage'
import { useAuthState } from "react-firebase-hooks/auth";

import {  GoogleProvider } from './services/firebase';


import { auth } from './services/firebase';
import SignUp from './pages/SignUp';  
import Login from './pages/Login';


const App = ({ dispatch }) => {
  const [user] = useAuthState(auth);
  if(user){
    dispatch(login(user.email, user.uid))
  }
  return (
    <Router>
      {user ?
        <>
          <PrivateNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignOut dispatch={dispatch} /></HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/list" component={OwnerQuestionsPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/new" component={QuestionFormPage} />
            <Redirect to="/" />
          </Switch>
        </> :
        <>
          <PublicNavbar />
          <Switch>
            <Route exact path="/" component={() => {
              return <HomePage><SignIn dispatch={dispatch} /></HomePage>
            }} />
            <Route exact path="/questions" component={QuestionsPage} />
            <Route exact path="/question/:id" component={SingleQuestionPage} />
            <Route exact path="/answer/:id" component={AnswerFormPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Redirect to="/" />
          </Switch>
        </>
      }
      <Footer></Footer>
    </Router>
  )
}


function SignIn() {
  const signInWithGoogle = () => {
    const provider = GoogleProvider();
    auth.signInWithPopup(provider);
  };
  return <div className="">
    <button className="button right" onClick={signInWithGoogle}>Sign in with google</button>
    <Link to="/login" className="button right mx-2" >Sign in</Link>
 
  </div>;
}

function SignOut({ dispatch }) {
  return (
    auth.currentUser && (
      <button
        className="button right login"
        onClick={() => {
          dispatch(logout())
          auth.signOut();
        }}
      >
        Salir
      </button>
    )
  );
}

  
export default App
