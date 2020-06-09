import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

export default function Contact() {
    return (
        <div>
            <Carousel className='custom-carousel'>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/slide_1.PNG"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h1>Asculta-ti corpul</h1>
                        <p>A fost nevoie de un virus pentru a ne da seama ca pofta noastra de viata este incurabila.
                        A fost nevoie sa ne intoarcem catre noi si sa ne regandim prioritatile, sa fim mai atenti la lucrurile
                        care conteaza cu adevarat..
                        </p>
                        <p>
                            Parcă nicicand nu a fost mai important sa fim conectati la corpul nostru, sa avem grija de el.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/slide_5.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h1>Cele 10 masuri pentru siguranta pacientilor</h1>
                        <div className='d-flex fw-bold' style={{ color: 'black', textAlign: 'left', fontSize: 'large' }}>
                            <ul>
                                <li>Triajul pacientilor: Identificam rapid pacientii cu simptome si infectii respiratorii la intrarea in clinici si spitale;</li>
                                <li>Asiguram masti de protectie pentru pacientii cu simptome de infectii respiratorii care se adreseaza clinicilor si insotitorilor acestora;</li>
                                <li>Avem spatii de izolare a cazurilor suspecte de boli infectioase in fiecare clinica;</li>
                                <li>Igiena mainilor este regula noastra de aur pe care o respectam cu maxima strictete;</li>
                                <li>Asiguram igiena riguroasa a tuturor spatiilor;</li>
                            </ul>
                            <ul>
                                <li>Asiguram dezinfectia rapida si corecta a spatiilor posibil contaminate;</li>
                                <li>Asiguram echipamente de protectie pentru personalul care ingrijeste cazuri cu suspiciune de infectie cu noul coronavirus;</li>
                                <li>Indrumam telefonic pacientii cu simptome, posibil suspecti, catre apelul de urgenta 112, conform procedurilor transmise de autoritati;</li>
                                <li>Respectam toate indicatiile autoritatilor si pastram permanent legatura cu acestea;</li>
                                <li>Luam masuri de incurajare atat a personalului, cat si a pacientilor sa respecte regulile de igiena respiratorie si igiena mainilor;</li>
                            </ul>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/slide_3.PNG"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <div>
                            <h1>Testeaza-te pentru diagnostic si anticorpi COVID 19</h1>
                            <a href="http://localhost:3000/programare" className="btn btn-info w-50">
                                Programeaza-te
					        </a>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./images/slide_4.PNG"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <div>
                            <h1>In clinica La Clinica, pentru maxima siguranta a pacientilor asiguram triaj special</h1>
                            <span style={{ color: 'black', textAlign: 'left', fontSize: 'xx-large' }}>Consultatiile se desfasoara in regim normal si in conditii de siguranta pentru pacienti.</span>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Abonamente</h1>
            <div className='d-flex mx-3 mb-5'>
                <div className='abonament-card'>
                    <div style={{ width: '90%' }}>
                        <h5>Comfort</h5>
                        <hr />
                        <h5>59 lei / luna</h5>
                        <hr />
                        <ul>
                            <li>3 CONSULTATII de medicina generala si interna</li>
                            <li>3 CONSULTATII la peste 20 de specialitati medicale + pana la 30% discount la investigatii medicale complexe</li>
                            <li>30% DISCOUNT imagistica si analize de laborator</li>
                            <li>20% DISCOUNT în Camera de Garda</li>
                            <li>HOTLINE MEDICAL 24/7</li>
                        </ul>
                    </div>
                </div>
                <div className='abonament-card'>
                    <div style={{ width: '90%' }}>
                        <h5>Comfort Plus</h5>
                        <hr />
                        <h5>99 lei / luna</h5>
                        <hr />
                        <ul>
                            <li>6 CONSULTATII de medicina generala si interna si set anual de analize fara recomandarea unui medic</li>
                            <li>6 CONSULTATII la peste 20 de specialitati medicale si 50% discount la investigatii medicale</li>
                            <li>50% DISCOUNT imagistica si analize laborator</li>
                            <li>20% DISCOUNT în Camera de Garda a Spitalelor</li>
                            <li>10% DISCOUNT la Parteneriat Academic (medici renumiti)</li>
                            <li>HOTLINE MEDICAL 24/7</li>
                        </ul>
                    </div>
                </div>
                <div className='abonament-card'>
                    <div style={{ width: '90%' }}>
                        <h5>Comfort Extra</h5>
                        <hr />
                        <h5>169 lei / luna</h5>
                        <hr />
                        <ul>
                            <li>CONSULTATII NELIMITATE de medicina generala si interna + set anual de analize fara recomandarea unui medic</li>
                            <li>HOTLINE MEDICAL 24/7 sfaturi medicale in cazul unei urgente</li>
                            <li>CONSULTATII NELIMITATE la peste 20 de specialitati medicale si 70% discount la investigatii medicale</li>
                            <li>50% DISCOUNT la imagistica (ecografie si radiologie) si analize laborator*</li>
                            <li>15% DISCOUNT la interventii chirurgicale, medici renumiti, Banca de Celule Stem</li>
                            <li>20% DISCOUNT in Camera de Garda a Spitatelor</li>
                        </ul>
                    </div>
                </div>
                <div className='abonament-card'>
                    <div style={{ width: '90%' }}>
                        <h5>Comfort Premium</h5>
                        <hr />
                        <h5>299 lei / luna</h5>
                        <hr />
                        <ul>
                            <li>CONSULTATII NELIMITATE de medicina generala si de specialitate + set anual de analize fara recomandarea unui medic</li>
                            <li>100% DISCOUNT imagistica</li>
                            <li>50% DISCOUNT in Camera de Garda a Spitalelor</li>
                            <li>15% DISCOUNT la interventii chirurgicale</li>
                            <li>100% DISCOUNT la medicii din Parteneriat Academic (medici de renume, profesori universitari)</li>
                            <li>HOTLINE MEDICAL 24/7</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}