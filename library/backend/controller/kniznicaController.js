var kniznica = require('../models/kniznica');

exports.create = async (req, res) => {
    try {
        const {  nazov, ulica, mesto, email, kontakt} = req.body;
        const response = await kniznica.create({
            
            nazov: nazov,
            ulica: ulica,
            mesto: mesto,
            email:email,
            kontakt: kontakt,
            
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
        const {nazov, ulica, mesto, email, kontakt} = req.body;
        const ec = req.params.ec;
        console.log('reg.body',req.body);
        const response= await kniznica.update({
            nazov: nazov,
            ulica: ulica,
            mesto: mesto,
            email:email,
            kontakt: kontakt,
        }, {
            where: { ec_kniznica: ec }

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
        const response = await kniznica.findAll({
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
        console.log('EC:',ec);
        const response = await kniznica.destroy({
            where: { ec_kniznica: ec }
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
        const ec_kniznica  = req.params.ec
        const response = await kniznica.findByPk(ec_kniznica)
            .then(function (data) {
                if (data) {
                    return data;
                }
                else {
                    res.status(500).send({
                        success: false,
                        data: data,
                        message: ' ' + ec_kniznica
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