const connection = require('./mysql')
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

module.exports =  {
    getPersonal
}