const {urlencoded} = require('express');
const express = require('express');
const app = express();

 
// 1-Middlewares 
app.use(express.urlencoded({extended:false}));
app.use(express.json())
//____________________________________________________________


// 2- Set Static Files
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
//____________________________________________________________


// 3- Settings
app.set('views', './public/views')
app.set('view engine', 'ejs');
const bcryptjs = require('bcryptjs'); //Call encryption module
//____________________________________________________________


// 4- Import Routes
const partRoutes = require("./public/routes/router");
//____________________________________________________________

// 5- Routes
app.use('/', partRoutes);
//____________________________________________________________

 
app.listen(3309, (req, res)=>{
    console.log("");
    console.log("-------------------------------------------");
    console.log("SERVER RUNNING IN http://localhost:3310");
    console.log("SERVER RUNNING IN http://localhost:3309");
});



// https://www.solumedia.com.ar/radios/8682/index.html pagina radio 
//http://localhost/phpmyadmin 

// sudo /opt/lampp/lampp start
//sudo /opt/lampp/lampp stop



// Agregar el boton info para saber el día exacto Swett Alert?? 
// Guardar en la Base de datos las canciones. La ultima q se escuchó y reanudar ahí.
// Modificar el menú lateral para que ahí muestre las cancionnes (todas)

// COMANDOS GIT
// status: para ver qué se modificó
// git add . para preparar
// commit: sube.... --> git commit -m "Nombre_de_merge"
