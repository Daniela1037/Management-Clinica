import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState, useEffect } from 'react';

export default function Preturi() {
    const [data, setData] = useState([])
    const [specializareSelectata, setSpecializareSelectata] = useState("Toate specializarile")
    const [filteredData, setFilteredData] = useState([])
    const [specializari, setSpecializari] = useState(["Toate specializarile"])

    useEffect(() => {
        const getPreturi = async () => {
            const response = await fetch('http://localhost:5000/preturi', {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const preturi = await response.json()
            setData(preturi)
            setFilteredData(preturi)
        }
        getPreturi()
        const getSpecializari = async() => {
            const response = await fetch('http://localhost:5000/specializari', {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
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
                {filteredData.map((row, idx) => (
                    <div className='card-preturi'>
                        <h5 className='titlu-card-preturi'>
                            {row.specializare}
                        </h5>
                        <hr />
                        <div className='linie-card-preturi'>
                            <span style={{ minWidth: '100px'}} className='fw-bold'>Serviciu</span>
                            <span style={{ minWidth: '100px'}} className='fw-bold'>Pret</span>
                        </div>
                        {row.servicii.map(serviciu => {
                            return (
                                <div>
                                    <hr />
                                    <div className='linie-card-preturi'>
                                        <span style={{ minWidth: '100px'}}>{serviciu.tip}</span>
                                        <span style={{ minWidth: '100px'}}>{serviciu.pret} lei</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}