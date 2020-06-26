const connection = require('../config/mysql')
const getSpecializari = (req, res, next) => {
    connection.query(
        `SELECT specializare from specializari`,
        [],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                let specializari = result.map((specializare) => { return specializare.specializare })
                specializari = [...new Set(specializari)]
                res.json(specializari)
            }
        })
}

const getPreturi = (req, res, next) => {
    connection.query(
        `SELECT * from specializari`,
        [],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                let specializari = result.map((specializare) => { return specializare.specializare })
                specializari = [...new Set(specializari)]
                const data = specializari.map(specializare => {
                    const servicii = result.filter(row => row.specializare === specializare).map(row => {
                        return {
                            tip: row.serviciu,
                            pret: row.pret
                        }
                    })
                    return {
                        specializare,
                        servicii
                    }
                })
                res.json(data)
            }
        })
}

const adaugaServiciu = (req, res, next) => {
    const {
        specializare,
        serviciu,
        pret,
    } = req.body

    connection.query(
        `INSERT INTO specializari (specializare, serviciu, pret) VALUES(?, ?, ?) `,
        [specializare, serviciu, pret],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send({
                    success: true,
                    message: 'Serviciul a fost adaugat cu succes'
                })
            }
        })
}

module.exports = {
    getSpecializari,
    getPreturi,
    adaugaServiciu,
}