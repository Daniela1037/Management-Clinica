const connection = require('./mysql');
const bcrypt = require('bcrypt')
const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const validPassword = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword);
}

const register = (req, res, next) => {
    const body = req.body;
    let {
        nume,
        prenume,
        data_nasterii,
        judet,
        oras,
        adresa,
        cnp,
        email,
        password,
        confirmedPassword
    } = body

    data_nasterii = new Date(data_nasterii).getTime()

    if (password !== confirmedPassword)
        res.send('parolele nu coincid')
    else {
        const hashedPassword = generateHash(password);
        connection.query(
            `INSERT INTO users (nume, prenume, data_nasterii, judet, oras, adresa, cnp, email, password)
                        VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?)`,
            [nume, prenume, data_nasterii, judet, oras, adresa, cnp, email, hashedPassword],
            (err, result) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('success');
                }
            })
    }
}

const login = (req, res, next) => {
    const body = req.body;
    let {
        email,
        password,
    } = body

    connection.query(
        `SELECT cnp, nivel_acces, password from users WHERE email = ?`,
        [email],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                const passwordFromDB = result[0].password
                if (validPassword(password, passwordFromDB)) {
                    res.json({
                        cnp:result[0].cnp,
                        nivel_acces:result[0].nivel_acces,
                        success:true
                    })
                } else {
                    res.send('parola este incorecta')
                }
            }
        })
}
module.exports = {
    register,
    login,
}