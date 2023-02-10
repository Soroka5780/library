const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const kniha = require('../models/kniha');



exports.create = async (req, res) => {
    try {
        const { ec_kniznica, nazov, autor, zaner, popis } = req.body;
        const response = await kniha.create({
            ec_kniznica: ec_kniznica,
            nazov: nazov,
            autor: autor,
            zaner: zaner,
            popis: popis,

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
        const { ec_kniznica, nazov, autor, zaner, popis, vylucenie } = req.body;
        console.log('vylucenie:', vylucenie);
        const ec = req.params.ec;
        const response = await kniha.update({
            ec_kniznica: ec_kniznica,
            nazov: nazov,
            autor: autor,
            zaner: zaner,
            popis: popis,
            vylucenie: vylucenie,

        }, {
            where: { ec_kniha: ec }

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
        const response = await kniha.findAll({
            where: { vylucenie: 0 }
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

exports.knihaByKniznica = async (req, res) => {
    try {
        const ec = req.params.ec;
        const response = await kniha.findAll({
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

exports.delete = async (req, res) => {
    try {
        const ec = req.params.ec;
        console.log(`ec:${ec}`);

        const response = await kniha.destroy({
            where: { ec_kniha: ec }
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
        const ec_kniha = req.params.ec;
        const response = await kniha.findByPk(ec_kniha)
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