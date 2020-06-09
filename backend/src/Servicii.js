const connection = require('./mysql')
const getServicii = (req, res, next) => {
    const specializare = req.query.specializare
    connection.query(
        `SELECT serviciu from specializari where specializare =?`,
        [specializare],
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                let servicii = result.map((serviciu) => { return serviciu.serviciu })
                servicii = [...new Set(servicii)]
                res.json(servicii)
            }
        })
}

module.exports = {
    getServicii
}