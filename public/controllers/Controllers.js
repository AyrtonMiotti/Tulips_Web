const controller = {};
const connection = require('../databases/db');


controller.login = (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;
    connection.query('SELECT * FROM USERS WHERE name_user = ?', [user], (error, results) =>{
        if (results[0] === undefined){
            return res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o contraseña incorrectos",
                alertIcon: "error",
                showConfirmButton: true,
                timer: 1500,
                ruta: ''
            })
            return;
        }
        else{
            if (pass != results[0].passwor) {
                return res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o contraseña incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: 1500,
                    ruta: ''
                });
            }
            else {
                const UserId = results[0].user_id;
                console.log(UserId)
                connection.query('TRUNCATE TABLE tempUser;')
                connection.query('INSERT INTO tempUser VALUES (' + UserId + ', ' + 1 + ');', (error, results) =>{
                })
                return res.render('login', {
                    alert: true,
                    alertTitle: "Bienvenido",
                    alertMessage: "¡Login correcto!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 900,
                    ruta: 'home',
                });
            }
        }
    })
};



// EXPORT || EXPORTACION
module.exports = controller;

//https://www.youtube.com/watch?v=FX2gtyB9Jw0