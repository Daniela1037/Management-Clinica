const connection = require('../config/mysql')
const getIstoricDoctori = async (req, res, next) => {
    const total = connection.query(`
    SELECT COUNT(programari.id) as total,
        CONCAT(users.nume, " ", users.prenume) as label,
        sum(case when programari.status = 'anulata' then 1 else 0 end) as anulate,
        sum(case when programari.status = 'efectuata' then 1 else 0 end) as efectuate,
        sum(case when programari.status = 'confirmata' then 1 else 0 end) as confirmate
        FROM programari left join users
        on programari.doctor = users.cnp
        GROUP BY programari.doctor`, [], (err, result) => {
            const dataPoints = {
                total: [],
                anulate: [],
                efectuate: [],
                confirmate: [],
            }
            result.forEach((row) => {
                const sum = row.total + row.anulate + row.efectuate
                dataPoints.total.push({y: row.total / sum * 100, label: row.label})
                dataPoints.efectuate.push({y: row.efectuate / sum * 100, label: row.label})
                dataPoints.anulate.push({y: row.anulate / sum * 100, label: row.label})
                dataPoints.confirmate.push({y: row.confirmate / sum * 100, label: row.label})
            })
            res.json(dataPoints)
        });
}

module.exports = {
    getIstoricDoctori
}