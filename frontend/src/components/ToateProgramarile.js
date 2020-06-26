import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function ToateProgramarile() {
	const [showModal, setShowModal] = useState(false)

	const [comentariu, setComentariu] = useState('')

	const [data, setData] = useState([])

	const [selectedRowData, setSelectedRowData] = useState()

	const adaugaComentariu = async () => {
		const response = await fetch('http://localhost:5000/adauga-comentariu', {
			method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: selectedRowData.id,
                comentariu
            })
		})
		window.location.reload()
	}

	const modificaStatus = async (rowData, status) => {
		const response = await fetch('http://localhost:5000/modifica-status', {
			method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: rowData.id,
                status
            })
		})
		window.location.reload()
	}

	useEffect(() => {
		const getData = async () => {
			const response = await fetch('http://localhost:5000/toate-programarile', {
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

	return (
		<div>
			<MaterialTable
				title="Toate programarile"
				columns={[
					{ title: 'CNP', field: 'cnp' },
					{ title: 'Nume', field: 'nume' },
					{ title: 'Prenume', field: 'prenume' },
					{ title: 'Data nasterii', field: 'data_nasterii', type: 'date' },
					{ title: 'Adresa', field: 'adresa' },
					{ title: 'Specializare', field: 'specializare' },
					{ title: 'Doctor', field: 'doctor' },
					{ title: 'Serviciu', field: 'serviciu' },
					{ title: 'Data si ora', field: 'data', type: 'date' },
					{ title: 'Comentarii', field: 'comentarii' },
					{ title: 'Status', field: 'status' },
				]}
				data={data}
				options={{
					filtering: true,
					actionsColumnIndex: -1,
					pageSize: 10,
					exportButton: true
				}}
				actions={[

					{
						icon: 'check',
						tooltip: 'Confirma',
						onClick: (event, rowData) => {
							modificaStatus(rowData, 'confirmata')
						}
					},
					{
						icon: 'clear',
						tooltip: 'Anuleaza',
						onClick: (event, rowData) => {
							modificaStatus(rowData, 'anulata')
						}
					},
					{
						icon: 'library_add',
						tooltip: 'Adauga comentariu',
						onClick: (event, rowData) => {
							setSelectedRowData(rowData)
							setShowModal(true)
						}
					},
					{
						icon: 'done_all',
						tooltip: 'Efectuata',
						onClick: (event, rowData) => {
							modificaStatus(rowData, 'efectuata')
						}
					},
				]}
			/>
			<Modal
				show={showModal}
				hide={() => { setShowModal(false) }}
			>
				<Modal.Body>
					<h5 className='text-center mt-3'>Introduceti comentariul: </h5>
					<textarea onChange={(e) => { setComentariu(e.target.value) }} value={comentariu} name="Text1" className='w-100' rows="5"></textarea>
				</Modal.Body>

				<Modal.Footer>
					<div className='w-100 d-flex justify-content-around'>
						<Button onClick={adaugaComentariu} variant="success">Adauga</Button>
						<Button onClick={() => { setShowModal(false) }} variant="dark">Anuleaza</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	)
}