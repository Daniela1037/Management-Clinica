import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function Login(props) {
    const [validated,setValidated] = useState(true)
    const handleLogin = async (event) => {
        event.preventDefault()
        const password = event.target.elements.password.value
        const email = event.target.elements.email.value
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        let data = await response.json()
        if(data.success === true) {
            localStorage.setItem('nivel_acces',data.nivel_acces)
            localStorage.setItem('cnp',data.cnp)
            window.location.assign('/programari')
        } else {
            event.preventDefault();
            event.stopPropagation();
            setValidated(false)
            return;
        }
    }

    return (
        <div className = 'row'>
            <div className='login-form mx-auto my-4 p-5 fw-bold'>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Parola</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    {!validated && <Form.Label className="text-danger">Email-ul sau parola sunt gresite!</Form.Label>}
                    <Button variant="primary" type="submit" className="btn btn-info w-100 mt-3">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}