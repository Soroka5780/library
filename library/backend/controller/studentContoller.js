const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var student = require('../models/student');

exports.create = async (req, res) => {
    try {
        const { ec_kniznica, meno, priezvisko, ulica, mesto, kontakt } = req.body;
        const response = await student.create({
            ec_kniznica: ec_kniznica,
            meno: meno,
            priezvisko: priezvisko,
            ulica: ulica,
            mesto:mesto,
            kontakt: kontakt
            
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

exports.studentByKniznica = async (req, res) => {
    try {
        const ec = req.params.ec;
        const response = await student.findAll({
            where: {
                [Op.and]: [  {vylucenie: 0}, {ec_kniznica: ec} ]
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


exports.update = async (req, res) => {
    try {
        const {ec_kniznica,meno, priezvisko, ulica, mesto, kontakt,vylucenie } = req.body;
        const ec = req.params.ec;
        const response = await student.update({
            ec_kniznica: ec_kniznica,
            meno:meno,
            priezvisko:priezvisko,
            ulica: ulica,
            mesto: mesto,
            kontakt:kontakt,
            vylucenie:vylucenie,
            

        }, {
            where: { ec_student: ec }

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
        const response = await student.findAll({
            where: { vylucenie: 0 }
        })
            .then(function (data) {
                if (data.lenght != 0) {
                    
                    return data;
                }
                else {
                    res.status(404).send({
                        success: false,
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
        console.log(ec);
        const response = await student.destroy({
            where: { ec_student: ec }
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
        const ec_student  = req.params.ec;
        const response = await student.findByPk(ec_student)
            .then(function (data) {
                if (data) {
                    return data;
                }
                else {
                    res.status(500).send({
                        success: false,
                        data: data,
                        message: ' ' + ec_student
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