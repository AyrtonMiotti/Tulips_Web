const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost", //dpg-cdkraikgqg43pc4kgvg0-a
    user: "root",
    password: "", //jGLR2SxQVN9iWJEfaGyqlSGGMs4vGqKW
    database: "Tulips", 
})

connection.connect((error)=>{
    if(error){
        console.log("El error de conexion es: " + error);
        return;
    }
    console.log("> Conexion a la base de datos exitosa");
});

module.exports = connection;