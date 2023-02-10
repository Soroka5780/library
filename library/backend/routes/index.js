
const knihaController = require('../controller/knihaController');
const kniznicaController = require('../controller/kniznicaController');
const studentController = require('../controller/studentContoller');
const vypozickyController = require('../controller/vypozickyController');


module.exports = function (app) {
    // kniha    
    app.get('/kniha/',knihaController.list);
    app.get('/kniha/:ec',knihaController.getOne);
    app.post('/kniha/',knihaController.create);
    app.patch('/kniha/:ec',knihaController.update);   
    app.delete('/kniha/:ec',knihaController.delete);
    app.get('/kniha/kniznica/:ec',knihaController.knihaByKniznica);
  

    //kniznica
    app.get('/kniznica/',kniznicaController.list);
    app.get('/kniznica/:ec',kniznicaController.getOne);
    app.post('/kniznica/',kniznicaController.create);
    app.patch('/kniznica/:ec',kniznicaController.update);
    app.delete('/kniznica/:ec',kniznicaController.delete);

    //student
    app.get('/student/',studentController.list);
    app.get('/student/:ec',studentController.getOne);
    app.post('/student/',studentController.create);
    app.patch('/student/:ec',studentController.update);
    app.delete('/student/:ec',studentController.delete);
    app.get('/student/kniznica/:ec',studentController.studentByKniznica);

    //vypozicky
    app.get('/vypozicky/',vypozickyController.list);
    app.get('/vypozicky/student/:ec',vypozickyController.listStudent);
    app.get('/vypozicky/historia/student/',vypozickyController.listKniznicaStudent);
    app.get('/vypozicky/:ec',vypozickyController.getOne);
    app.post('/vypozicky/',vypozickyController.create);
    app.patch('/vypozicky/:ec',vypozickyController.update);
    app.delete('/vypozicky/:ec',vypozickyController.delete);
}