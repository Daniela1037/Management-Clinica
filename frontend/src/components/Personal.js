import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState, useEffect } from 'react';

export default function Personal() {
    const [specializari, setSpecializari] = useState(["Toate specializarile"])
    const [specializareSelectata, setSpecializareSelectata] = useState("Toate specializarile")
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState(data)
    useEffect(() => {
        const getDoctori = async () => {
            const response = await fetch('http://localhost:5000/personal', {
                method: 'GET',
            })
            const personal = await response.json()
            setData(personal)
            setFilteredData(personal)
        }
        getDoctori()
        const getSpecializari = async() => {
            const response = await fetch('http://localhost:5000/specializari', {
                method: 'GET',
            })
            const data = await response.json()
            setSpecializari([...specializari, ...data])
        }
        getSpecializari()
    }, [])
    
    return (
        <div>
            <div className='ml-5 mt-3'>
                <h5>Selecteaza specializarea</h5>
                <DropdownButton bsPrefix="btn btn-info" id="dropdown-basic-button" title={specializareSelectata}>
                    {specializari.map(specializare => {
                        return (
                            <Dropdown.Item
                                onClick={(e) => {
                                    setSpecializareSelectata(specializare)
                                    setFilteredData(data.filter(doctor => doctor.specializare === specializare || specializare === "Toate specializarile"))
                                }}
                                style={{ textTransform: "capitalize" }}
                                href="#/action-1">
                                {specializare}
                            </Dropdown.Item>
                        )
                    })}
                </DropdownButton>
            </div>
            <div className='row'>
                {filteredData.map(doctor => {
                    return (
                        <div className='doctor-card'>
                            <div style={{ width: '60%' }}>
                                <div>
                                    <h5>
                                        {`Dr. ${doctor.nume} ${doctor.prenume}`}
                                    </h5>
                                </div>
                                <hr />
                                <div>
                                    {`Specializare: ${doctor.specializare}`}
                                </div>
                                <hr />
                                <div>
                                    {`Email: ${doctor.email}`}
                                </div>
                                <hr />
                                <a href="https://mail.google.com/mail/u/0/#inbox?compose=XBcJlMCGXjBkpnkcfhZfTplCdNSPQctlFWHRGXcnRldzpBnZvdxkKGslkdzpgpGHBCRTsDHHTvbKzDcb"
                                    className="btn btn-info w-100">
                                    Send Email
                                </a>
                            </div>
                            <img className='poza' src={`./images/${doctor.prenume}.${doctor.nume}.jpg`.toLowerCase()}>

                            </img>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}