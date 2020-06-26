import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function AdaugaDoctor() {
    const [validated, setValidated] = useState(false);
    const [validatedStergere, setValidatedStergere] = useState(false);
    const [success, setSuccess] = useState();
    const [successStergere, setSuccessStergere] = useState();
    const [users, setUsers] = useState([])
    const [specializari, setSpecializari] = useState([])

    const adaugaDoctor = async (event) => {
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
            const cnp = event.target.elements.cnp.value
            const specializare = event.target.elements.specializare.value
            const response = await fetch('http://localhost:5000/adauga-doctor', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cnp,
                    specializare,
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

    const stergeDoctor = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
                setValidatedStergere(true)
                return;
            }
            const cnp = event.target.elements.cnp.value
            const response = await fetch('http://localhost:5000/eliminare-doctor', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cnp,
                })
            })
            const data = await response.json();
            if (data.success === true) {
                setSuccessStergere(true);
            } else {
                event.preventDefault();
                event.stopPropagation();
                setSuccessStergere(false)
            }
        } catch (err) {
            event.preventDefault();
            event.stopPropagation();
            setSuccessStergere(false)
        }
    };

    useEffect(() => {
        const getUsers = async () => {
            const response = await fetch('http://localhost:5000/users', {
                method: 'GET',
            })
            const data = await response.json()
            setUsers(data)
        }
        getUsers()

        const getSpecializari = async () => {
            const response = await fetch('http://localhost:5000/specializari', {
                method: 'GET',
            })
            const data = await response.json()
            setSpecializari(data)
        }
        getSpecializari()
    }, [])


    return (
        <div className='row'>
            <div className='form-programare'>
                <Form noValidate validated={validated} onSubmit={adaugaDoctor}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="cnp">
                            <Form.Label>CNP</Form.Label>
                            <Form.Control required as="select">
                                <option value="">Alege...</option>
                                {users.map(user => (
                                    <option value={user.cnp}>{user.cnp}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="specializare">
                            <Form.Label>Specializare</Form.Label>
                            <Form.Control required as="select">
                                <option value="">Alege...</option>
                                {specializari.map(specialziare => {
                                    return <option value={specialziare}>{specialziare}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    {success === true && <Form.Label className="text-success">Doctorul a fost adaugat cu succes!</Form.Label>}
                    {success === false && <Form.Label className="text-danger">A aparut o problema, va rugam incercati mai tarziu!</Form.Label>}
                    <Button variant="primary" type="submit" className="btn btn-info w-100 mt-3">
                        Adauga Doctor
                    </Button>
                </Form>
            </div>
            <div className='form-programare'>
                <Form noValidate validated={validated} onSubmit={stergeDoctor}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="cnp">
                            <Form.Label>CNP</Form.Label>
                            <Form.Control required as="select">
                                <option value="">Alege...</option>
                                {users.map(user => (
                                    <option value={user.cnp}>{user.cnp}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    {successStergere === true && <Form.Label className="text-success">Doctorul a fost sters cu succes!</Form.Label>}
                    {successStergere === false && <Form.Label className="text-danger">A aparut o problema, va rugam incercati mai tarziu!</Form.Label>}
                    <Button variant="primary" type="submit" className="btn btn-info w-100 mt-3">
                        Eliminare doctor
                    </Button>
                </Form>
            </div>
        </div>
    )
}