import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function AdaugaServiciu() {
    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState();

    const adaugaServiciu = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                setValidated(true)
                return;
            }
            const specializare = event.target.elements.specializare.value
            const serviciu = event.target.elements.serviciu.value
            const pret = event.target.elements.pret.value
            const response = await fetch('http://localhost:5000/adauga-serviciu', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    specializare,
                    serviciu,
                    pret,
                })
            })
            const data = await response.json();
            if (data.success === true) {
                setSuccess(true);
            } else {
                event.preventDefault();
                event.stopPropagation();
                setSuccess(false)
            }
        } catch (err) {
            event.preventDefault();
            event.stopPropagation();
            setSuccess(false)
        }
    };

    return (
        <div className='row'>
            <div className='form-programare'>
                <Form noValidate validated={validated} onSubmit={adaugaServiciu}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="specializare">
                            <Form.Label>Specializare</Form.Label>
                            <Form.Control required as="input">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="serviciu">
                            <Form.Label>Serviciu</Form.Label>
                            <Form.Control required as="input">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="pret">
                            <Form.Label>Pret</Form.Label>
                            <Form.Control required as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    {success === true && <Form.Label className="text-success">Serviciul a fost adaugat cu succes!</Form.Label>}
                    {success === false && <Form.Label className="text-danger">A aparut o problema, va rugam incercati mai tarziu!</Form.Label>}
                    <Button variant="primary" type="submit" className="btn btn-info w-100 mt-3">
                        Adauga Serviciu
                    </Button>
                </Form>
            </div>
        </div>
    )
}