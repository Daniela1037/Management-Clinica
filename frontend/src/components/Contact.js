import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

function Map() {
	return (
		<GoogleMap
			defaultZoom={15}
			defaultCenter={{ lat: 45.7455309, lng: 21.2361517 }}
		>
			<Marker position={{ lat: 45.7455309, lng: 21.2361517 }} />
		</GoogleMap>
	)
}

export default function Contact() {

	const WrappedMap = withScriptjs(withGoogleMap(Map))

	return (
		<div className='row'>
			<div className="card mx-auto mt-5" style={{ width: '50%', height: 'fit-content' }}>
				<div className="card-header fw-bold" style={{ fontSize: '20px' }}>
					Contact info
       			 </div>
				<div className="card-body">
					<div>
						<span className="card-text fw-bold mr-1" >Adresa:</span>
						<span>Bd. Eroilor de la Tisa, nr. 1</span>
					</div>
					<hr />
					<div className="d-flex">
						<span className="card-text fw-bold mr-1">Telefon:</span>
						<div>
							<div>+40730554171</div>
							<div>+40731234556</div>
						</div>
					</div>
					<hr />
					<div>
						<span className="card-text fw-bold mr-1" >Email:</span>
						<span>daniela.cirlugea@gmail.com</span>
					</div>
					<hr />
					<a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCKCGlnhblkQLdFKXTkKZPnQXRPpzgClWSfsvntCMhMFzkzJQvsTSNskPHngGlVbJqhCxjqV" className="btn btn-info w-100">
						Send Email
					</a>
				</div>
				<div className="card-footer fw-bold text-muted">
					Program de lucru - L-V 8:00 – 20:00
				</div>
			</div>
			<div className='mt-5 mx-auto' style={{ width: '90%', height: '400px' }}>
				<WrappedMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDHubD_a-DIL4vXC9dx-W1SimzLXYk1MnQ`}
					loadingElement={<div style={{ height: '100%' }}></div>}
					containerElement={<div style={{ height: '100%' }}></div>}
					mapElement={<div style={{ height: '100%' }}></div>}
				/>
			</div>
		</div>
	)
}