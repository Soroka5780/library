const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const vypozicky = require('../models/vypozicky');


exports.create = async (req, res) => {
    try {
        const {ec_kniznica, ec_kniha,ec_student, datum_vypozicane, datum_predpokladane } = req.body;
        const response = await vypozicky.create({
            
            ec_kniznica:ec_kniznica,
            ec_kniha:ec_kniha,
            ec_student:ec_student,
            datum_vypozicane: datum_vypozicane,
            datum_predpokladane: datum_predpokladane,
            
        })
            .then(function (data) {
                const res = {
                    success: true,
                    data: data,
                    message: 'Successfuly created'
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            })
        res.json(response)
    } catch (e) {
        console.log(e)
    }
}




exports.update = async (req, res) => {
    try {        
        const {ec_kniznica, ec_kniha,ec_student, datum_vypozicane, datum_predpokladane, datum_skutocne} = req.body;
        const ec = req.params.ec;        
        const response = await vypozicky.update({
            ec_kniznica:ec_kniznica,
            ec_kniha:ec_kniha,
            ec_student:ec_student,
            datum_vypozicane: datum_vypozicane,
            datum_predpokladane: datum_predpokladane,
            datum_skutocne: datum_skutocne,

        }, {
            where: { ec_vypozicka: ec }

        })
            .then(function (data) {
                if (data.length != 0) {
                    const res = {
                        success: true,
                        data: data,
                        message: ' updated Successfuly '
                    }
                    return res;
                }
                else {
                    res.status(500).send({
                        success: false,
                        data: data,
                        message: 'Could not update with this id' + id
                    })
                }

            })

        res.json(response)

    }
    catch (e) {
        console.log(e)
    }
}


exports.list = async (req, res) => {
    try {
        const response = await vypozicky.findAll({
        })
            .then(function (data) {
                if (data.lenght != 0) {
                    return data;
                }
                else {
                    res.status(404).send({

                        data: data,
                        message: 'No Record Found width for id' + id
                    })
                }

            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            })
        res.json(response)


    }
    catch (e) {
        console.log(e)
    }
}

exports.listKniznicaStudent = async (req, res) => {
    try {
        
        const ec_kniznica = req.query.kniznica;
        const ec_student = req.query.student;
        const response = await vypozicky.findAll({
            attributes: ["ec_kniha","ec_student","datum_vypozicane","datum_predpokladane","datum_skutocne"],
            where: {
                [Op.and]: [  {ec_kniznica: ec_kniznica}, {ec_student: ec_student} ]
            }

        })
            .then(function (data) {
                if (data.lenght != 0) {
                    return data;
                }
                else {
                    res.status(404).send({

                        data: data,
                        message: 'No Record Found width for id' + id
                    })
                }

            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            })
        res.json(response)


    }
    catch (e) {
        console.log(e)
    }
}

exports.listStudent = async (req, res) => {
    try {
        const  ec  = req.params.ec;        
        const response = await vypozicky.findAll({
            where: { ec_student: ec }
        })
            .then(function (data) {
                if (data.lenght != 0) {
                    return data;
                }
                else {
                    res.status(404).send({

                        data: data,
                        message: 'No Record Found width for id' + id
                    })
                }

            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            })
        res.json(response)


    }
    catch (e) {
        console.log(e)
    }
}


exports.delete = async (req, res) => {
    try {
        const  ec  = req.params.ec;
        console.log(`ec:${ec}`);

        const response = await vypozicky.destroy({
            where: { ec_vypozicka: ec }
        })
            .then(function (data) {
                if (data.lenght != 0) {
                    const res = {
                        success: true,
                        data: data,
                        message: 'Delete successfully with'
                    }
                    return res;
                }
                else {
                    res.status(500).send({
                        success: false,
                        data: data,
                        message: ' Could not delete width for id' + id
                    })
                }

            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            })
        res.json(response)


    }
    catch (e) {
        console.log(e)
    }
}


exports.getOne = async (req, res) => {
    try {
        const ec_vypozicka = req.params.ec;
        console.log('EC:',ec_vypozicka);
        const response = await vypozicky.findByPk(ec_vypozicka)
            .then(function (data) {
                if (data) {
                    return data;
                }
                else {
                    res.status(500).send({
                        success: false,
                        data: data,
                        message: ' ' + ec_kniha
                    })
                }

            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            })
        res.json(response)


    }
    catch (e) {
        console.log(e)
    }
}