import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function Programare() {
    const [validated, setValidated] = useState(false);
    const [success, setSuccess] = useState();
    const [doctori, setDoctori] = useState([])
    const [specializari, setSpecializari] = useState([])
    const [servicii, setServicii] = useState([])
    const [specializareSelectata, setSpecializareSelectata] = useState()
    const [doctorSelectat, setDoctorSelectat] = useState()
    const [dataSelectata, setDataSelectata] = useState()
    const [doctoriFiltrati, setDoctoriFiltrati] = useState([])
    const [oreDisponibile, setOreDisponibile] = useState([])

    useEffect(() => {
        const getDoctori = async () => {
            const response = await fetch('http://localhost:5000/personal', {
                method: 'GET',
            })
            const personal = await response.json()
            setDoctori(personal)
            setDoctoriFiltrati(personal)
        }
        getDoctori()

        const getSpecializari = async () => {
            const response = await fetch('http://localhost:5000/specializari', {
                method: 'GET',
            })
            const data = await response.json()
            setSpecializari(data)
        }
        getSpecializari()
    }, [])

    useEffect(() => {
        setDoctoriFiltrati(doctori.filter(doctor => doctor.specializare === specializareSelectata))
        const getServicii = async () => {
            const response = await fetch('http://localhost:5000/servicii?' + new URLSearchParams({
                specializare: specializareSelectata
            }), {
                method: 'GET',
            })
            const data = await response.json()
            setServicii(data)
        }
        getServicii()
    }, [specializareSelectata])

    useEffect(() => {
        const getOreDisponibile = async () => {
            const response = await fetch('http://localhost:5000/ore-disponibile?' + new URLSearchParams({
                data: dataSelectata,
                doctor: doctorSelectat ? doctorSelectat.cnp : '',
            }), {
                method: 'GET',
            })
            const data = await response.json()
            setOreDisponibile(data)
        }
        getOreDisponibile()
    }, [dataSelectata])

    const handleSubmit = async (event) => {
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
            const doctor = doctorSelectat.cnp
            const serviciu = event.target.elements.serviciu.value
            const selectedDate = new Date(event.target.elements.data.value)
            selectedDate.setHours(parseInt(event.target.elements.ora.value), 0, 0)
            const timestamp = selectedDate.getTime()
            const response = await fetch('http://localhost:5000/programare', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    specializare,
                    doctor,
                    serviciu,
                    data: timestamp,
                    pacient: localStorage.getItem('cnp'),
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="specializare">
                            <Form.Label>Specializare</Form.Label>
                            <Form.Control onChange={(e) => { setSpecializareSelectata(e.target.value) }} required as="select">
                                <option value="">Alege...</option>
                                {specializari.map(specializare => (
                                    <option value={specializare}>{specializare}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="doctor">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Control onChange={(e) => { setDoctorSelectat(JSON.parse(e.target.value)) }} required as="select">
                                <option value="">Alege...</option>
                                {doctoriFiltrati.map(doctor => {
                                    const nume = doctor.nume + ' ' + doctor.prenume
                                    return <option value={JSON.stringify(doctor)}>{nume}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="serviciu">
                            <Form.Label>Serviciu</Form.Label>
                            <Form.Control required as="select">
                                <option value="">Alege...</option>
                                {servicii.map(serviciu => {
                                    return <option value={serviciu}>{serviciu}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="data">
                            <Form.Label>Data</Form.Label>
                            <Form.Control onChange={(e) => { setDataSelectata(e.target.value) }} required type="date" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="ora">
                            <Form.Label>Ora</Form.Label>
                            <Form.Control required as="select">
                                <option value="">Alege...</option>
                                {oreDisponibile.map(ora => {
                                    return <option value={ora}>{`${ora}:00`}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    {success === true && <Form.Label className="text-success">Programarea dumneavoastra a fost efectuata cu succes!</Form.Label>}
                    {success === false && <Form.Label className="text-danger">A aparut o problema, va rugam incercati mai tarziu!</Form.Label>}
                    <Button variant="primary" type="submit" className="btn btn-info w-100 mt-3">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}