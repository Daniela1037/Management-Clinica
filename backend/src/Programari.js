const connection = require('../config/mysql')
const getProgramarileMele = (req, res, next) => {
    const cnp = req.query.cnp
    connection.query(`SELECT programari.specializare,
            CONCAT(users.nume, " ", users.prenume) as doctor,
            programari.serviciu,
            programari.data,
            programari.status
                FROM programari LEFT JOIN users
                ON programari.doctor = users.cnp
                WHERE programari.pacient = ?`,
        [cnp],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                result.forEach(element => {
                    element.data = new Date(element.data);
                    element.data_nasterii = new Date(element.data_nasterii);
                });
                res.json(result);
            }
        });
}

const getToateProgramarile = (req, res, next) => {
    connection.query(`SELECT *, (SELECT CONCAT(nume, ' ', prenume) FROM users WHERE users.cnp=programari.doctor) as doctor
            FROM programari LEFT JOIN users
            ON programari.pacient = users.cnp`,
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                result.forEach(element => {
                    element.data = new Date(element.data);
                    element.data_nasterii = new Date(element.data_nasterii);
                });
                res.json(result);
            }
        });
}

const adaugaComentariu = (req, res, next) => {
    const id = req.body.id
    const comentariu = req.body.comentariu
    connection.query(`UPDATE programari SET comentarii = ? where id = ?`,
        [comentariu, id],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                res.json(result);
            }
        });
}

const modificaStatus = (req, res, next) => {
    const id = req.body.id
    const status = req.body.status
    connection.query(`UPDATE programari SET status = ? where id = ?`,
        [status, id],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                res.json(result);
            }
        });
}

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

const getOreDisponibile = (req, res, next) => {
    const data = req.query.data
    const doctor = req.query.doctor
    connection.query(`SELECT * from programari where doctor = ?`,
        [doctor],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                const programariInDataSelectata = result.filter(programare => sameDay(new Date(programare), new Date(data)))
                let availableHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
                availableHours = availableHours.filter( hour => !programariInDataSelectata.find(programare => {
                    return new Date(programare).getHours() === hour
                }))
                res.json(availableHours);
            }
        });
}

const adaugaProgramare = (req, res, next) => {
    const {
        pacient,
        doctor,
        specializare,
        serviciu,
        data,
    } = req.body
    connection.query(`INSERT INTO programari (pacient, doctor, specializare, serviciu, data)
            VALUES(?, ?, ?, ?, ?)`,
        [pacient, doctor, specializare, serviciu, data],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                res.json({
                    success: true,
                });
            }
        });
}

module.exports = {
    getProgramarileMele,
    getToateProgramarile,
    adaugaComentariu,
    modificaStatus,
    getOreDisponibile,
    adaugaProgramare,
}