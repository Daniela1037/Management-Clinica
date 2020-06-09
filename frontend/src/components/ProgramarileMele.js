import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


export default function ProgramarileMele() {
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)

    const [selectedRowData, setSelectedRowData] = useState()

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:5000/programarile-mele?' + new URLSearchParams({
                cnp: localStorage.getItem('cnp')
            }), {
                method: 'GET',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const programari = await response.json()
            setData(programari)
        }
        getData()
    }, [])

	const anuleazaProgramare = async () => {
		const response = await fetch('http://localhost:5000/modifica-status', {
			method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectedRowData.id,
                status: 'anulata'
            })
		})
		window.location.reload()
	}

    return (
        <div className='p-4'>
            <MaterialTable
                title="Programarile mele"
                columns={[
                    { title: 'Specializare', field: 'specializare' },
                    { title: 'Doctor', field: 'doctor' },
                    { title: 'Serviciu', field: 'serviciu' },
                    { title: 'Data si ora', field: 'data', type: 'date' },
                    { title: 'Status', field: 'status', filtering: false },
                ]}
                data={data}
                options={{
                    filtering: true,
                    actionsColumnIndex: -1,
                    pageSize: 10
                }}
                actions={[
                    {
                        icon: 'cancel',
                        tooltip: 'Anuleaza programarea',
                        onClick: (event, rowData) => {
                            setSelectedRowData(rowData)
                            setShowModal(true)
                        }
                    }
                ]}
            />
            <Modal
                show={showModal}
                hide={() => { setShowModal(false) }}
            >
                <Modal.Body>
                    <h5 className='text-center mt-3'>Sunteti siguri ca vreti sa anulati programarea? </h5>
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-100 d-flex justify-content-around'>
                        <Button onClick={anuleazaProgramare} variant="danger">Da</Button>
                        <Button onClick={() => { setShowModal(false) }} variant="dark">Nu</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
