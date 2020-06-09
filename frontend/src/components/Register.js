import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function Register() {
    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState(undefined);

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true)
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const nume = event.target.elements.nume.value
        const prenume = event.target.elements.prenume.value
        const data_nasterii = event.target.elements.data_nasterii.value
        const cnp = event.target.elements.cnp.value
        const adresa = event.target.elements.adresa.value
        const oras = event.target.elements.oras.value
        const judet = event.target.elements.judet.value
        const email = event.target.elements.email.value
        const password = event.target.elements.password.value
        const confirmedPassword = event.target.elements.confirmedPassword.value
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nume,
                prenume,
                data_nasterii,
                judet,
                oras,
                adresa,
                cnp,
                email,
                password,
                confirmedPassword
            })
        })
        let data = await response.text()
        if(data === 'success') {
            setSuccess(true);
        } else {
            event.preventDefault();
            event.stopPropagation();
            setSuccess(false)
        }
    };
    const judete = ["Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", "Botosani", "Braila", "Brasov", "Buzau", "Calarasi", "Caras-Severin", "Cluj", "Constanta", "Covasna", "Dolj", "Galati", "Giurgiu", "Gorj", "Harghita", "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt", "Prahova", "Salaj", "Satu Mare", "Sibiu", "Teleorman", "Timis", "Tulcea", "Valcea", "Vaslui", "Vrancea"]
    return (
        <div className='row'>
            <div className='register-form mx-auto my-4 p-5 fw-bold'>
                <Form className="w-100" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row className="mt-2">
                        <Form.Group as={Col} controlId="nume">
                            <Form.Label>Nume</Form.Label>
                            <Form.Control required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="prenume">
                            <Form.Label>Prenume</Form.Label>
                            <Form.Control required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="data_nasterii">
                            <Form.Label>Data nasterii</Form.Label>
                            <Form.Control type="date" required />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-3">
                        <Form.Group as={Col} controlId="cnp">
                            <Form.Label>CNP</Form.Label>
                            <Form.Control required />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-3">
                        <Form.Group as={Col} controlId="adresa">
                            <Form.Label>Adresa</Form.Label>
                            <Form.Control placeholder="Strada:......., Nr........" required />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-3">
                        <Form.Group as={Col} controlId="oras">
                            <Form.Label>Oras</Form.Label>
                            <Form.Control required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="judet">
                            <Form.Label>Judet</Form.Label>
                            <Form.Control as="select" required>
                                <option value=''>Alege...</option>
                                {judete.map(judet => <option>{judet}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-3">
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="password">
                            <Form.Label>Parola</Form.Label>
                            <Form.Control type="password" placeholder="Parola" required />
                        </Form.Group>

                        <Form.Group as={Col} controlId="confirmedPassword">
                            <Form.Label>Confirmati Parola</Form.Label>
                            <Form.Control type="password" placeholder="Confirmati parola" required />
                        </Form.Group>
                    </Form.Row>
                    {success === false && <Form.Label className="text-danger">A aparut o problema, va rugam incercati mai tarziu!</Form.Label>}
                    {success === true && <Form.Label className="text-success">Ati fost inregistrat cu succes!</Form.Label>}
                    <Button variant="primary" type="submit" className="btn btn-info w-100 mt-3">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    )
}