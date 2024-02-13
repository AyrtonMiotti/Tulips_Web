const express = require("express");
const router = express.Router();

const partController = require("../controllers/Controllers");
const chargeJson = require('../controllers/chargeSongs');
const save = require("../databases/dbMusic.js");


save.crearTablaSQL;

// RUTAS
//router.get('/', (req, res)=>{
    //return res.render('musicPlayer', save.crearTablaSQL);
//})

// RUTAS
router.get('/', (req, res)=>{
    //save.crearTablaSQL();
    return res.render('musicPlayer');
})

router.get('/flower', (req, res)=>{
    return res.render('flower');
})

router.get('/charge', (req, res)=>{
    return res.render('charge');
})

router.get('/poemas', (req, res)=>{
    return res.render('poemas');
})

// Functions
router.post("/logIn", partController.login);
router.post('/charge', chargeJson.charge);
//router.post('/guardar-ultima-cancion', save.guardarCancionEnReproduccion);



module.exports = router;