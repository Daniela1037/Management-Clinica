const connection = require('./mysql')
const getIstoricDoctori = (req, res, next) => {
    let total
    connection.query(`SELECT COUNT(programari.id) as y, CONCAT(users.nume, " ", users.prenume) as label FROM programari left join users
        on programari.doctor = users.cnp
        GROUP BY programari.doctor`,
        [],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                total = result;
            }
        });

    let anulate
    connection.query(`SELECT COUNT(programari.id) as y, CONCAT(users.nume, " ", users.prenume) as label FROM programari left join users
        on programari.doctor = users.cnp
        where programari.status = 'anulata' 
        GROUP BY programari.doctor`,
        [],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                anulate = result;
            }
        });

    let efectuate
    connection.query(`SELECT COUNT(programari.id) as y, CONCAT(users.nume, " ", users.prenume) as label FROM programari left join users
            on programari.doctor = users.cnp
            where programari.status = 'confirmata' 
            GROUP BY programari.doctor`,
        [],
        (err, result) => {
            if (err) {
                console.log(err)
                return res.send('server error');
            } else {
                efectuate = result;
                let dataPoints = {}
                dataPoints.total = total.map((data, index) => {
                    let totalIndex = 0, anulateIndex = 0, efectuateIndex = 0
                    if (total[index]) totalIndex = total[index].y
                    if (anulate[index]) anulateIndex = anulate[index].y
                    if (efectuate[index]) efectuateIndex = efectuate[index].y
                    const totalDoctor = totalIndex + efectuateIndex + anulateIndex
                    let y = data.y
                    if (totalDoctor)
                        y = data.y / totalDoctor * 100
                    return {
                        y,
                        label: data.label
                    }
                })
                dataPoints.efectuate = efectuate.map((data, index) => {
                    let totalIndex = 0, anulateIndex = 0, efectuateIndex = 0
                    if (total[index]) totalIndex = total[index].y
                    if (anulate[index]) anulateIndex = anulate[index].y
                    if (efectuate[index]) efectuateIndex = efectuate[index].y
                    const totalDoctor = totalIndex + efectuateIndex + anulateIndex
                    let y = data.y
                    if (totalDoctor)
                        y = data.y / totalDoctor * 100
                    return {
                        y,
                        label: data.label
                    }
                })
                dataPoints.anulate = anulate.map((data, index) => {
                    let totalIndex = 0, anulateIndex = 0, efectuateIndex = 0
                    if (total[index]) totalIndex = total[index].y
                    if (anulate[index]) anulateIndex = anulate[index].y
                    if (efectuate[index]) efectuateIndex = efectuate[index].y
                    const totalDoctor = totalIndex + efectuateIndex + anulateIndex
                    let y = data.y
                    if (totalDoctor)
                        y = data.y / totalDoctor * 100
                    return {
                        y,
                        label: data.label
                    }
                })
                res.json({
                    ...dataPoints
                })
            }
        });
}

module.exports = {
    getIstoricDoctori
}