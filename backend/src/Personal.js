const connection = require('../config/mysql')
const getPersonal = (req, res, next) => {
    connection.query(
        `SELECT * from doctori, users where doctori.cnp = users.cnp`,
        [],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.json(result)
            }
        })
}

const adaugaDoctor = (req, res, next) => {
    const {
        cnp,
        specializare
    } = req.body

    connection.query(
        `INSERT INTO doctori (cnp, specializare) VALUES(?, ?) `,
        [cnp, specializare],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                connection.query(`UPDATE users SET nivel_acces='doctor' where cnp=?`,
                    [cnp],
                    (err, result) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                                message: 'Doctorul a fost adaugat cu succes'
                            })
                        }
                    })
            }
        })
}

const eliminareDoctor = (req, res, next) => {
    const {
        cnp,
    } = req.body

    connection.query(
        `DELETE FROM doctori WHERE cnp = ?`,
        [cnp],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                connection.query(`UPDATE users SET nivel_acces='user' where cnp=?`,
                    [cnp],
                    (err, result) => {
                        if (err) {
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                                message: 'Doctorul a fost eliminat cu succes'
                            })
                        }
                    })

            }
        })
}

module.exports = {
    getPersonal,
    adaugaDoctor,
    eliminareDoctor,
}