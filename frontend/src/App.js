import React from 'react';
import './App.css'
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Contact from './components/Contact'
import Register from './components/Register'
import Login from './components/Login'
import Personal from './components/Personal'
import Preturi from './components/Preturi'
import ToateProgramarile from './components/ToateProgramarile'
import ProgramarileMele from './components/ProgramarileMele'
import Programare from './components/Programare'
import IstoricDoctori from './components/IstoricDoctori'
import PaginaPrincipala from './components/PaginaPrincipala'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from '@material-ui/core';

function App() {
  const userAccess = localStorage.getItem('nivel_acces') === 'user'
  const doctorAccess = localStorage.getItem('nivel_acces') === 'doctor'
  const adminAccess = localStorage.getItem('nivel_acces') === 'admin'

  return (
    <div id='main'>
      <Navbar bg="info" variant="dark">
        <img src='./images/logo.png' style={{height:'50px', width:'50px'}} className='mr-3'></img>
        <Navbar.Brand as={Link} to="/"><h4>La Clinica</h4></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/personal"><h6>Personal</h6></Nav.Link>
          <Nav.Link as={Link} to="/preturi"><h6>Preturi</h6></Nav.Link>
          {(userAccess || doctorAccess || adminAccess) && <Nav.Link as={Link} to="/programari"><h6>Programarile mele</h6></Nav.Link>}
          {(userAccess || doctorAccess || adminAccess) && <Nav.Link as={Link} to="/programare"><h6>Programeaza-te</h6></Nav.Link>}
          {(doctorAccess || adminAccess) && <Nav.Link as={Link} to="/toate-programarile"><h6>Toate programarile</h6></Nav.Link>}
          {(doctorAccess || adminAccess) && <Nav.Link as={Link} to="/istoric-doctori"><h6>Istoric doctori</h6></Nav.Link>}
          <Nav.Link as={Link} to="/contact"><h6>Contact</h6></Nav.Link>
        </Nav>
        {(userAccess || doctorAccess || adminAccess) && <Link className="btn btn-outline-light" onClick = {() => {
          localStorage.setItem('nivel_acces','')
          window.location.assign('/')
        }}>
          Logout
        </Link> }
        {!(userAccess || doctorAccess || adminAccess) && <Link to='/login' className="btn btn-outline-light">Login</Link>}
        {!(userAccess || doctorAccess || adminAccess) && <Link to='/register' className="btn btn-outline-light ml-2">Register</Link>}
      </Navbar>
      <Switch>
        <Route exact path='/' component={PaginaPrincipala} />
        <Route exact path='/personal' component={Personal} />
        <Route exact path='/preturi' component={Preturi} />
        <Route exact path='/programari' component={ProgramarileMele} />
        <Route exact path='/programare' component={Programare} />
        <Route exact path='/toate-programarile' component={ToateProgramarile} />
        <Route exact path='/istoric-doctori' component={IstoricDoctori} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route render={function () {
          return <p>Not found</p>
        }} />
      </Switch>
    </div>
  )
}

export default App;
